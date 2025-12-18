import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={clsx(
                className
            )}
            style={{
                backgroundColor: 'hsl(var(--bg-card))',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid hsl(var(--border-light))',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ title, description, action }: { title: string, description?: string, action?: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
                {description && <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-secondary))' }}>{description}</p>}
            </div>
            {action}
        </div>
    )
}
