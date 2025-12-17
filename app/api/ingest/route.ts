import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        // 1. Security Check
        const apiKey = request.headers.get('Authorization')
        if (apiKey !== `Bearer ${process.env.INGESTION_API_KEY}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Parse & Validate Payload
        const body = await request.json()
        const { countryIso, diseaseName, year, cases, deaths, recovered } = body

        if (!countryIso || !diseaseName || !year) {
            return NextResponse.json({ error: 'Missing required fields: countryIso, diseaseName, year' }, { status: 400 })
        }

        // 3. Find or Create Country
        let country = await db.country.findUnique({
            where: { isoCode: countryIso }
        })

        if (!country) {
            // For robustness, if country doesn't exist, we create it (or could return error)
            // Ideally we'd have a full list of countries seeded, but this supports expansion
            country = await db.country.create({
                data: {
                    name: countryIso, // Fallback name
                    isoCode: countryIso,
                }
            })
        }

        // 4. Find or Create Disease
        let disease = await db.disease.findUnique({
            where: { name: diseaseName }
        })

        if (!disease) {
            disease = await db.disease.create({
                data: {
                    name: diseaseName,
                    description: 'Auto-created via ingestion'
                }
            })
        }

        // 5. Upsert Stats
        const stat = await db.diseaseStat.upsert({
            where: {
                countryId_diseaseId_year: {
                    countryId: country.id,
                    diseaseId: disease.id,
                    year: year
                }
            },
            update: {
                cases: cases || undefined,
                deaths: deaths || undefined,
                recovered: recovered || undefined,
                active: (cases || 0) - (deaths || 0) - (recovered || 0)
            },
            create: {
                countryId: country.id,
                diseaseId: disease.id,
                year: year,
                cases: cases || 0,
                deaths: deaths || 0,
                recovered: recovered || 0,
                active: (cases || 0) - (deaths || 0) - (recovered || 0)
            }
        })

        return NextResponse.json({ success: true, stat })
    } catch (error) {
        console.error('Ingestion Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
