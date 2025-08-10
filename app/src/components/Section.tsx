import { motion, type Variants } from 'framer-motion'

const container: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.5 } },
}
const item: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginTop: 56 }}>
      <h2 style={{ fontSize: 20, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--muted)' }}>{title}</h2>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </section>
  )
}

export const sectionItem = item
export const sectionContainer = container