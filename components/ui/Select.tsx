'use client'

import React from 'react'
import styles from './select.module.css'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    options: { label: string; value: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <select className={`${styles.select} ${className || ''}`} {...props}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
