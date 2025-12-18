'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts'

interface FundingData {
    id: string
    year: number
    domestic: number
    international: number
    country: { name: string }
    disease: { name: string }
}

interface ChartDataItem {
    name: string
    domestic: number
    international: number
}

export default function FundingPageClient() {
    const [fundingData, setFundingData] = useState<FundingData[]>([])
    const [selectedYear, setSelectedYear] = useState<string>('2023')

    useEffect(() => {
        fetch(`/api/funding?year=${selectedYear}`)
            .then(res => res.json())
            .then(data => setFundingData(data))
            .catch(err => console.error(err))
    }, [selectedYear])

    // Aggregate data by country
    const chartData = fundingData.reduce((acc: ChartDataItem[], curr) => {
        const existing = acc.find(item => item.name === curr.country.name)
        if (existing) {
            existing.domestic += curr.domestic
            existing.international += curr.international
        } else {
            acc.push({
                name: curr.country.name,
                domestic: curr.domestic,
                international: curr.international
            })
        }
        return acc
    }, [])

    const years = [
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Funding & Economics</h1>
                    <p style={{ color: 'hsl(var(--text-secondary))' }}>Tracking financial resource allocation for disease control.</p>
                </div>
                <Select
                    label="Year"
                    options={years}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <Card>
                    <CardHeader title="Total International Aid" description={`Total external funding in ${selectedYear}`} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'hsl(var(--brand-primary))' }}>
                        ${fundingData.reduce((acc, curr) => acc + curr.international, 0).toLocaleString()}
                    </div>
                </Card>
                <Card>
                    <CardHeader title="Total Domestic Spending" description={`Total internal funding in ${selectedYear}`} />
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'hsl(var(--success))' }}>
                        ${fundingData.reduce((acc, curr) => acc + curr.domestic, 0).toLocaleString()}
                    </div>
                </Card>
            </div>

            <Card style={{ height: '500px' }}>
                <CardHeader title="Funding Distribution by Country" description="Domestic vs. International Spending (USD)" />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border-light))" />
                        <XAxis dataKey="name" stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                            stroke="hsl(var(--text-secondary))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value / 1000000}M`}
                        />
                        <RechartsTooltip
                            contentStyle={{ backgroundColor: 'hsl(var(--bg-card))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--border-light))' }}
                            itemStyle={{ color: 'hsl(var(--text-primary))' }}
                        />
                        <Legend />
                        <Bar dataKey="domestic" name="Domestic" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="international" name="International Aid" fill="hsl(var(--brand-primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
