import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'hsl(var(--text-primary))',
                    color: 'hsl(var(--bg-primary))',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    whiteSpace: 'nowrap',
                    zIndex: 50,
                    pointerEvents: 'none'
                }}>
                    {content}
                    {/* Arrow */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderWidth: '5px',
                        borderStyle: 'solid',
                        borderColor: 'hsl(var(--text-primary)) transparent transparent transparent'
                    }} />
                </div>
            )}
        </div>
    );
}
