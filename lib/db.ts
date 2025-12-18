import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    // During build, if DATABASE_URL is missing, use a dummy one to pass validation.
    // The actual connection is not needed for build if routes are dynamic.
    const url = process.env.DATABASE_URL || 'postgresql://build:build@localhost:5432/build'
    return new PrismaClient({
        datasources: {
            db: {
                url,
            },
        },
    })
}

// Global setup to safely handle Prisma Client in development and production
// preventing multiple instances in development and handling build-time checks
const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

const db = globalForPrisma.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
