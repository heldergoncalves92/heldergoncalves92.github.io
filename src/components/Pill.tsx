import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  variant?: 'default' | 'ghost';
}

export function Pill({ children, variant = 'default' }: PillProps) {
  const className = variant === 'ghost' ? 'pill pill--ghost' : 'pill';
  return <span className={className}>{children}</span>;
}

interface PillsProps {
  items: string[];
  variant?: 'default' | 'ghost';
}

export function Pills({ items, variant }: PillsProps) {
  return (
    <div className="pills">
      {items.map((item) => (
        <Pill key={item} variant={variant}>
          {item}
        </Pill>
      ))}
    </div>
  );
}
