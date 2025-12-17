import React from 'react'
import Link from 'next/link'
import db from '@/lib/db'
import { ArrowLeft, Shield, Stethoscope, AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DiseaseDetailPage({ params }: { params: { id: string } }) {
    const disease = await db.disease.findUnique({
        where: { id: params.id }
    })

    if (!disease) return notFound()

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
            <Link href="/knowledge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <ArrowLeft size={16} /> Back to Knowledge Base
            </Link>

            <div style={{ backgroundColor: 'hsl(var(--bg-card))', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))', overflow: 'hidden' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid hsl(var(--border-light))' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>{disease.name}</h1>
                    <p style={{ fontSize: '1.125rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>{disease.description}</p>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <Section
                        title="Symptoms & Risk Factors"
                        icon={AlertCircle}
                        content={disease.symptoms || "Information on symptoms is currently being updated by our medical research team."}
                        color="hsl(var(--warning))"
                        bgColor="hsl(var(--hue-warning) 90% 95%)"
                    />

                    <Section
                        title="Treatment & Care"
                        icon={Stethoscope}
                        content={disease.treatment || "Standard treatment protocols vary by region and severity. Consult local health authorities."}
                        color="hsl(var(--brand-primary))"
                        bgColor="hsl(var(--brand-light))"
                    />

                    <Section
                        title="Prevention"
                        icon={Shield}
                        content={disease.prevention || "Preventative measures include standard hygiene practices and vaccination where available."}
                        color="hsl(var(--success))"
                        bgColor="hsl(var(--hue-success) 90% 95%)"
                    />

                </div>
            </div>
        </div>
    )
}

interface SectionProps {
    title: string;
    icon: React.ElementType;
    content: string;
    color: string;
    bgColor: string;
}

function Section({ title, icon: Icon, content, color, bgColor }: SectionProps) {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{ padding: '0.75rem', backgroundColor: bgColor, color: color, borderRadius: 'var(--radius-md)' }}>
                <Icon size={24} />
            </div>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>{content}</p>
            </div>
        </div>
    )
}
