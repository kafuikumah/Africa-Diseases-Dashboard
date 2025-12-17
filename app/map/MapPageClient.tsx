'use client'

import React, { useState, useEffect } from 'react'
import Map from '@/components/map/Map'
import { Select } from '@/components/ui/Select'

interface MapPageClientProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    diseases: any[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MapPageClient({ diseases }: MapPageClientProps) {
    const [selectedDisease, setSelectedDisease] = useState<string>(diseases[0]?.id || '')
    const [selectedMetric, setSelectedMetric] = useState('cases')
    const [selectedYear, setSelectedYear] = useState('2023')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stats, setStats] = useState<any[]>([])

    useEffect(() => {
        if (!selectedDisease) return

        // Fetch stats for the selected disease and year
        fetch(`/api/stats?diseaseId=${selectedDisease}&year=${selectedYear}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err))
    }, [selectedDisease, selectedYear])

    const metrics = [
        { label: 'Active Cases', value: 'cases' },
        { label: 'Deaths', value: 'deaths' },
        { label: 'Recovered', value: 'recovered' },
        { label: 'Funding (International)', value: 'international_funding' }
    ]

    const years = [
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' }
    ]

    const diseaseOptions = diseases.map((d) => ({ label: d.name, value: d.id }))

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'hsl(var(--bg-card))', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Interactive Disease Map</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Select
                        label="Year"
                        options={years}
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    />
                    <Select
                        label="Disease"
                        options={diseaseOptions}
                        value={selectedDisease}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                    />
                    <Select
                        label="Metric"
                        options={metrics}
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ flex: 1, minHeight: '500px', backgroundColor: 'hsl(var(--bg-card))', padding: '0.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))' }}>
                <Map stats={stats} activeMetric={selectedMetric} />
            </div>

            {/* Legend / Info Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--bg-card))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--border-light))' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'hsl(var(--text-secondary))' }}>Selected Year</h4>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{selectedYear}</p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--bg-card))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--border-light))' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'hsl(var(--text-secondary))' }}>Selected Disease</h4>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{diseases.find(d => d.id === selectedDisease)?.name}</p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--bg-card))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--border-light))' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'hsl(var(--text-secondary))' }}>Total Cases</h4>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{stats.reduce((acc, curr) => acc + (curr.cases || 0), 0).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}
