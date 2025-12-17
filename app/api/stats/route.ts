import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined
    const countryId = searchParams.get('countryId')
    const diseaseId = searchParams.get('diseaseId')

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {}
        if (year) where.year = year
        if (countryId) where.countryId = countryId
        if (diseaseId) where.diseaseId = diseaseId

        const stats = await db.diseaseStat.findMany({
            where,
            include: {
                country: true,
                disease: true,
            },
            orderBy: { year: 'desc' }
        })
        return NextResponse.json(stats)
    } catch (error) {
        console.error('Failed to fetch stats:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
