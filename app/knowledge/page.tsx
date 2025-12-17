import Link from 'next/link'
import db from '@/lib/db'
import { ArrowRight, Activity } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function KnowledgeBasePage() {
    const diseases = await db.disease.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Disease Knowledge Base</h1>
                <p style={{ color: 'hsl(var(--text-secondary))' }}>Comprehensive information about major diseases affecting the continent.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {diseases.map((disease: any) => (
                    <Link
                        key={disease.id}
                        href={`/knowledge/${disease.id}`}
                        style={{
                            backgroundColor: 'hsl(var(--bg-card))',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid hsl(var(--border-light))',
                            overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        className="hover:scale-[1.02] hover:shadow-md"
                    >
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: 'hsl(var(--brand-light))', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--brand-primary))', marginBottom: '1rem' }}>
                                <Activity size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{disease.name}</h3>
                            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.875rem', lineHeight: '1.5' }}>
                                {disease.description}
                            </p>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid hsl(var(--border-light))', backgroundColor: 'hsl(var(--bg-secondary))', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--brand-primary))', fontSize: '0.875rem', fontWeight: 600 }}>
                            Learn More <ArrowRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
