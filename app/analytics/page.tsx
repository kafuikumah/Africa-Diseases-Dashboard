import db from '@/lib/db'
import AnalyticsClient from './AnalyticsClient'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
    const diseases = await db.disease.findMany({
        orderBy: { name: 'asc' }
    })

    return <AnalyticsClient diseases={diseases} />
}
