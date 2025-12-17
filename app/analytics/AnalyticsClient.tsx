'use client'

import React, { useState, useEffect } from 'react'
import { Select } from '@/components/ui/Select'
import { TrendChart } from '@/components/charts/TrendChart'

// Define types for the data
interface StatData {
    year: number;
    cases: number;
    deaths: number;
    recovered: number;
    // Add other properties if they exist in the API response but are not used here
    // e.g., country: string;
}

interface AggregatedYearData {
    year: number;
    cases: number;
    deaths: number;
    recovered: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AnalyticsClient({ diseases }: { diseases: any[] }) {
    const [selectedDisease, setSelectedDisease] = useState(diseases[0]?.id || '')
    const [trendData, setTrendData] = useState<AggregatedYearData[]>([])

    useEffect(() => {
        if (!selectedDisease) return

        // Fetch aggregate stats across all countries for this disease
        // For now we will fetch all stats and aggregate on client (not ideal for real large data but fine for prototype)
        // Or we rely on /api/stats to return per-stat.
        // Actually our /api/stats returns all rows correctly.
        // We will aggregate by year.
        fetch(`/api/stats?diseaseId=${selectedDisease}`)
            .then(res => res.json())
            .then((data: StatData[]) => {
                // Aggregate by year
                const agg = data.reduce((acc: Record<number, AggregatedYearData>, curr: StatData) => {
                    const year = curr.year
                    if (!acc[year]) acc[year] = { year, cases: 0, deaths: 0, recovered: 0 }
                    acc[year].cases += curr.cases
                    acc[year].deaths += curr.deaths
                    acc[year].recovered += curr.recovered
                    return acc
                }, {})

                // Convert to array and sort
                const sorted = Object.values(agg).sort((a: AggregatedYearData, b: AggregatedYearData) => a.year - b.year)
                setTrendData(sorted)
            })
            .catch(console.error)
    }, [selectedDisease])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Analytics & Trends</h1>
                <div style={{ width: '250px' }}>
                    <Select
                        label="Select Disease"
                        options={diseases.map(d => ({ label: d.name, value: d.id }))}
                        value={selectedDisease}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ backgroundColor: 'hsl(var(--bg-card))', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Disease Spread Over Time</h2>
                <TrendChart
                    data={trendData}
                    xKey="year"
                    lines={[
                        { key: 'cases', color: 'hsl(var(--brand-primary))', name: 'Confirmed Cases' },
                        { key: 'recovered', color: 'hsl(var(--success))', name: 'Recovered' },
                        { key: 'deaths', color: 'hsl(var(--danger))', name: 'Deaths' }
                    ]}
                />
            </div>
        </div>
    )
}
