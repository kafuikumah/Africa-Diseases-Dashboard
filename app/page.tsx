import { ArrowUpRight, Activity, Users, Globe } from 'lucide-react'

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>Real-time monitoring of key disease metrics across the continent.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Active Cases" value="2.4M" change="+12%" icon={Activity} />
        <StatCard title="Recovered" value="1.8M" change="+5%" icon={Users} />
        <StatCard title="Countries Monitored" value="54" change="0%" icon={Globe} />
        <StatCard title="Funding Deployed" value="$4.2B" change="+8%" icon={ArrowUpRight} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'hsl(var(--bg-card))', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))', height: '400px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Map Preview</h3>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'hsl(var(--bg-secondary))', borderRadius: 'var(--radius-md)' }}>
            Map Component Coming Soon
          </div>
        </div>

        <div style={{ backgroundColor: 'hsl(var(--bg-card))', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border-light))', height: '400px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Trends</h3>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'hsl(var(--bg-secondary))', borderRadius: 'var(--radius-md)' }}>
            Chart Component Coming Soon
          </div>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ title, value, change, icon: Icon }: { title: string, value: string, change: string, icon: any }) {
  return (
    <div style={{
      backgroundColor: 'hsl(var(--bg-card))',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid hsl(var(--border-light))',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ padding: '0.75rem', backgroundColor: 'hsl(var(--brand-light))', borderRadius: 'var(--radius-md)', color: 'hsl(var(--brand-primary))' }}>
          <Icon size={24} />
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--success))', backgroundColor: 'hsl(var(--hue-success) 90% 95%)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
          {change}
        </span>
      </div>
      <div>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{value}</h3>
      </div>
    </div>
  )
}
