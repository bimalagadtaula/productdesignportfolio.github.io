import { motion } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'

export type NavItem = { id: string; label: string }

type NavProps = {
  items: NavItem[]
  onToggleTheme: () => void
  isDark: boolean
}

export function Nav({ items, onToggleTheme, isDark }: NavProps) {
  const activeId = useScrollSpy(items.map((i) => i.id))

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        backdropFilter: 'saturate(180%) blur(8px)',
        background: 'color-mix(in oklab, canvas 75%, transparent)',
        borderBottom: '1px solid color-mix(in oklab, canvasText 10%, transparent)',
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', maxWidth: 1040, margin: '0 auto' }}>
        <a href="#home" style={{ fontWeight: 700, letterSpacing: 0.4 }}>Roger C.</a>
        <div style={{ display: 'flex', gap: 12 }}>
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              aria-current={activeId === i.id ? 'page' : undefined}
              style={{
                padding: '4px 6px',
                borderRadius: 8,
                background: activeId === i.id ? 'color-mix(in oklab, canvasText 7%, transparent)' : 'transparent',
              }}
            >
              {i.label}
            </a>
          ))}
          <button onClick={onToggleTheme} aria-pressed={isDark} style={{ padding: '6px 10px', borderRadius: 8 }}>
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}