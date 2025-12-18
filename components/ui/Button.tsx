import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    icon?: React.ElementType;
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon: Icon,
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className={styles.spinner} size={16} />}
            {!isLoading && Icon && <Icon size={18} className={styles.icon} />}
            {children}
        </button>
    );
}
