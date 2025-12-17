'use client'

import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

interface TrendChartProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
    xKey: string
    lines: { key: string; color: string; name: string }[]
}

export function TrendChart({ data, xKey, lines }: TrendChartProps) {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-medium))" opacity={0.5} />
                    <XAxis
                        dataKey={xKey}
                        stroke="hsl(var(--text-secondary))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--text-secondary))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value > 1000 ? `${value / 1000}k` : value}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--bg-card))',
                            borderRadius: '8px',
                            border: '1px solid hsl(var(--border-light))',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        labelStyle={{ color: 'hsl(var(--text-primary))', fontWeight: 600 }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {lines.map((line) => (
                        <Line
                            key={line.key}
                            type="monotone"
                            dataKey={line.key}
                            stroke={line.color}
                            strokeWidth={3}
                            name={line.name}
                            dot={{ r: 4, fill: line.color, strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
