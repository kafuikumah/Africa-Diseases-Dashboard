import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const diseases = await db.disease.findMany({
            orderBy: { name: 'asc' },
        })
        return NextResponse.json(diseases)
    } catch (error) {
        console.error('Failed to fetch diseases:', error)
        return NextResponse.json({ error: 'Failed to fetch diseases' }, { status: 500 })
    }
}
