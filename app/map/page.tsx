import db from '@/lib/db'
import MapPageClient from './MapPageClient'

export default async function MapPage() {
    const diseases = await db.disease.findMany({
        orderBy: { name: 'asc' },
    })

    return <MapPageClient diseases={diseases} />
}
