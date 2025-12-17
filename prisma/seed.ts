import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const COUNTRIES = [
  { name: 'Nigeria', isoCode: 'NGA', region: 'West Africa', population: 206000000 },
  { name: 'Ethiopia', isoCode: 'ETH', region: 'East Africa', population: 115000000 },
  { name: 'Egypt', isoCode: 'EGY', region: 'North Africa', population: 102000000 },
  { name: 'Democratic Republic of the Congo', isoCode: 'COD', region: 'Central Africa', population: 89000000 },
  { name: 'South Africa', isoCode: 'ZAF', region: 'Southern Africa', population: 59000000 },
  { name: 'Tanzania', isoCode: 'TZA', region: 'East Africa', population: 59000000 },
  { name: 'Kenya', isoCode: 'KEN', region: 'East Africa', population: 53000000 },
  { name: 'Uganda', isoCode: 'UGA', region: 'East Africa', population: 45000000 },
  { name: 'Algeria', isoCode: 'DZA', region: 'North Africa', population: 43000000 },
  { name: 'Sudan', isoCode: 'SDN', region: 'North Africa', population: 43000000 },
]

const DISEASES = [
  { name: 'Malaria', description: 'A mosquito-borne infectious disease.', type: 'Parasitic' },
  { name: 'HIV/AIDS', description: 'A virus that attacks the body’s immune system.', type: 'Viral' },
  { name: 'Tuberculosis', description: 'A generic disease caused by bacteria usually attacking the lungs.', type: 'Bacterial' },
  { name: 'Cholera', description: 'An acute diarrhoeal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.', type: 'Bacterial' },
  { name: 'COVID-19', description: 'Infectious disease caused by the SARS-CoV-2 virus.', type: 'Viral' },
  { name: 'Ebola', description: 'A rare and deadly disease in people and nonhuman primates.', type: 'Viral' },
]

async function main() {
  console.log('Start seeding ...')

  // Clear existing data
  await prisma.diseaseStat.deleteMany()
  await prisma.funding.deleteMany()
  await prisma.country.deleteMany()
  await prisma.disease.deleteMany()

  // Create Countries
  for (const c of COUNTRIES) {
    await prisma.country.create({
      data: c,
    })
  }

  // Create Diseases
  for (const d of DISEASES) {
    await prisma.disease.create({
      data: {
        name: d.name,
        description: d.description,
      },
    })
  }

  const countries = await prisma.country.findMany()
  const diseases = await prisma.disease.findMany()

  // Generate Stats (2015 - 2024)
  for (const country of countries) {
    for (const disease of diseases) {
      for (let year = 2015; year <= 2024; year++) {
        const baseCases = Math.floor(Math.random() * 50000) + 1000
        const cases = disease.name === 'COVID-19' && year < 2020 ? 0 : baseCases
        const deaths = Math.floor(cases * (Math.random() * 0.05 + 0.01))
        const recovered = Math.floor(cases * 0.8)
        
        if (cases > 0) {
            await prisma.diseaseStat.create({
            data: {
                year,
                countryId: country.id,
                diseaseId: disease.id,
                cases,
                deaths,
                recovered,
                active: cases - deaths - recovered,
            },
            })

            // Funding Data
            await prisma.funding.create({
                data: {
                    year,
                    countryId: country.id,
                    diseaseId: disease.id,
                    domestic: Math.floor(Math.random() * 1000000) + 50000,
                    international: Math.floor(Math.random() * 5000000) + 100000,
                }
            })
        }
      }
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
