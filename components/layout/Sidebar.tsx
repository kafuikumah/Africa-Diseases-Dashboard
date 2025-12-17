'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Map as MapIcon, BarChart3, BookOpen, Settings } from 'lucide-react'
import styles from './sidebar.module.css'
import clsx from 'clsx'

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Interactive Map', href: '/map', icon: MapIcon },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
    { label: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon} />
                <span className={styles.logoText}>AfriHealth</span>
            </div>

            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(styles.navItem, isActive && styles.active)}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.footer}>
                <p className={styles.footerText}>African Disease Monitor v1.0</p>
            </div>
        </aside>
    )
}
