import { motion } from 'framer-motion'
import type { PropsWithChildren, CSSProperties } from 'react'

type CardProps = PropsWithChildren<{
  title?: string
  href?: string
  as?: 'article' | 'div'
  style?: CSSProperties
}>

export function Card({ title, href, children, as = 'article', style }: CardProps) {
  const Comp = motion[as]
  const content = (
    <Comp
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        border: '1px solid color-mix(in oklab, canvasText 12%, transparent)',
        borderRadius: 12,
        padding: 16,
        background: 'color-mix(in oklab, canvas 97%, transparent)',
        ...style,
      }}
    >
      {title ? <h3 style={{ marginBottom: 6 }}>{title}</h3> : null}
      <div>{children}</div>
    </Comp>
  )

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </a>
    )
  }

  return content
}