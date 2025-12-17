import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const countries = await db.country.findMany({
            orderBy: { name: 'asc' },
        })
        return NextResponse.json(countries)
    } catch (error) {
        console.error('Failed to fetch countries:', error)
        return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
    }
}
