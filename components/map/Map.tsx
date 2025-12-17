'use client'

import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('./MapClient'), {
    ssr: false,
    loading: () => <div style={{ height: '100%', width: '100%', background: 'hsl(var(--bg-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Map(props: any) {
    return <MapClient {...props} />
}
