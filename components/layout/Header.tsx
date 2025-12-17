'use client'

import { Moon, Sun, Bell } from 'lucide-react'
import { useTheme } from '../providers/theme-provider'
import styles from './header.module.css'

export function Header() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                {/* Placeholder for search or breadcrumbs */}
                <span className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className={styles.actions}>
                <button className={styles.iconButton} aria-label="Notifications">
                    <Bell size={20} />
                </button>

                <button
                    className={styles.iconButton}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>AU</div>
                </div>
            </div>
        </header>
    )
}
