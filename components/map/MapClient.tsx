'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './map.module.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapClientProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stats?: any[] // Simplified for now, could be more specific like Array<{ countryCode: string; value: number; }>
    activeMetric?: string
    onCountryClick?: (countryCode: string) => void
}

// Use 'any' cast to bypass type errors with React 18/Next.js mismatch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapContainerAny = MapContainer as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TileLayerAny = TileLayer as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GeoJSONAny = GeoJSON as any

export default function MapClient({ stats, activeMetric = 'cases', onCountryClick }: MapClientProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unusedParams = [stats, activeMetric]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [geoData, setGeoData] = useState<any>(null)

    useEffect(() => {
        // Fetch African countries GeoJSON
        fetch('https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/africa.geojson')
            .then(res => res.json())
            .then(data => setGeoData(data))
            .catch(err => console.error('Failed to load GeoJSON', err))
    }, [])

    const getColor = (d: number) => {
        return d > 100000 ? '#800026' :
            d > 50000 ? '#BD0026' :
                d > 20000 ? '#E31A1C' :
                    d > 10000 ? '#FC4E2A' :
                        d > 5000 ? '#FD8D3C' :
                            d > 1000 ? '#FEB24C' :
                                d > 100 ? '#FED976' :
                                    '#FFEDA0';
    }

    // Mock data mapping if stats not provided
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getCountryStat = (isoCode: string) => {
        // In production this would filter `stats` prop
        // For now returning random for visual demo
        return Math.floor(Math.random() * 100000)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const style = (feature: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const stat = getCountryStat(feature.properties.iso_a3 || feature.properties.adm0_a3)
        return {
            fillColor: getColor(stat),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEachFeature = (feature: any, layer: any) => {
        const countryName = feature.properties.name
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const stat = getCountryStat(feature.properties.iso_a3)

        layer.bindTooltip(`
      <div style="font-family: var(--font-sans)">
        <strong>${countryName}</strong><br/>
        Stat: ${stat.toLocaleString()}
      </div>
    `, {
            sticky: true,
            direction: 'top'
        })

        layer.on({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mouseover: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.9
                });
                layer.bringToFront();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mouseout: (e: any) => {
                const layer = e.target;
                // reset style (simplified)
                layer.setStyle({
                    weight: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                });
            },
            click: () => {
                if (onCountryClick) onCountryClick(feature.properties.iso_a3)
            }
        });
    }

    if (!geoData) return <div>Loading Map Data...</div>

    return (
        <div className={styles.mapContainer}>
            <MapContainerAny
                center={[1.65, 19.1]}
                zoom={3}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                className={styles.leafletMap}
            >
                <TileLayerAny
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // For dark mode, we could use a different tile provider or filter
                    className={styles.tileLayer}
                />
                <GeoJSONAny
                    data={geoData}
                    style={style}
                    onEachFeature={onEachFeature}
                />
            </MapContainerAny>
        </div>
    )
}
