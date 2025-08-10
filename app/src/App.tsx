import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import './App.css'
import { Nav } from './components/Nav'
import { Section, sectionContainer, sectionItem } from './components/Section'
import { Card } from './components/Card'

function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const hours = new Date().getHours()
    const startDark = hours >= 19 || hours <= 7
    setIsDark(startDark)
  }, [])

  useEffect(() => {
    const body = document.body
    if (isDark) {
      body.classList.add('night')
    } else {
      body.classList.remove('night')
    }
  }, [isDark])

  const toggle = () => setIsDark((prev) => !prev)
  return [isDark, toggle]
}

const container: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.5,
    },
  },
}

const item: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

const experiences = [
  { company: 'TV Bandeirantes - Vibra Digital', time: '2022/12 - Now', position: 'UX Manager for Band News portal and Bandplay streaming service.', used: ['Leadership', 'UX Design', 'Research', 'Design Ops', 'Microsoft Clarity', 'SEO'] },
  { company: 'Nelogica - Profit Pro & Vector', time: '2021/12', position: 'UX Manager for trading and home broker products.', used: ['Leadership', 'UX Design', 'Research', 'Design Ops'] },
  { company: 'Amazon - SellersFunding', time: '2021/02 - 2021/11', position: 'UX Designer/Researcher for Marketplace Funding Services.', used: ['UX Research', 'Framer / Figma', 'Google Data Studio', 'HotJar / AB', 'Design Ops'] },
]

const skills = {
  design: ['Design Thinking', 'UX & Visual', 'Service Design', 'Pesquisa', 'Branding', 'Prototipação', 'Wireframing', 'Produto'],
  tools: ['Suite Adobe', 'Figma', 'Jira', 'Confluence', 'Git', 'Postman', 'Data Studio'],
  frontend: ['TypeScript', 'React', 'HTML/CSS/Sass', 'Tailwind', 'Vite'],
  multi: ['Estratégia e Pesquisa', 'Ágil', 'Gestão de Equipes', 'Pesquisa de Usuário'],
}

function App() {
  const [isDark, toggleDark] = useDarkMode()
  const introRef = useRef<HTMLElement | null>(null)
  const [showTop, setShowTop] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      const introHeight = introRef.current?.offsetHeight ?? 0
      setShowTop(window.scrollY > introHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sections = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'exp', label: 'Experiência' },
    { id: 'contato', label: 'Contato' },
  ]

  return (
    <div>
      <Nav items={sections} onToggleTheme={toggleDark} isDark={isDark} />

      <header id="home" className="intro" ref={introRef}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item} className="intro__hello" style={{ fontSize: 48, marginBottom: 8 }}>
            Olá! <span className="emoji wave-hand animated" />
          </motion.h1>
          <motion.p variants={item} style={{ fontSize: 20, opacity: 0.8, maxWidth: 760 }}>
            Agora você pode conhecer meus trabalhos através do site <strong>rogerverso.site</strong>.
          </motion.p>
          <motion.div variants={item} style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="mailto:roger@monolito.cc" className="highlight-link">roger.camara@outlook.com</a>
            <a href="/resume.pdf" target="_blank" className="arrow-link" rel="noreferrer">CV</a>
            <a href="/portfolio.pdf" target="_blank" className="arrow-link" rel="noreferrer">Portfolio</a>
          </motion.div>
        </motion.div>
      </header>

      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '24px 16px' }}>
        <Section id="resumo" title="Resumo">
          <motion.div variants={sectionContainer}>
            <motion.p variants={sectionItem} style={{ marginTop: 12, lineHeight: 1.7, opacity: 0.9 }}>
              Atualmente, atuo como UX Designer e Researcher focado em Inovação, desenvolvendo pesquisas e projetos com design estratégico e lean inception, centrado no usuário e suas interações com interfaces digitais e novos canais de consumo.
            </motion.p>
            <motion.p variants={sectionItem} style={{ marginTop: 12, lineHeight: 1.7, opacity: 0.9 }}>
              Com mais de 14 anos de experiência, atuei em projetos para grandes empresas do varejo brasileiro e latino-americano, desenvolvendo soluções para internacionalização de marcas, relacionamento com o consumidor e qualificação de processos B2B.
            </motion.p>
            <motion.div variants={sectionItem} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 }}>
              <Card title="CV" href="/resume.pdf" />
              <Card title="Portfolio" href="/portfolio.pdf" />
              <Card title="LinkedIn" href="https://linkedin.com/in/rogercamara" />
            </motion.div>
          </motion.div>
        </Section>

        <Section id="skills" title="Habilidades">
          <motion.div variants={sectionContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <motion.div variants={sectionItem}>
              <h3>Design</h3>
              <ul>
                {skills.design.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={sectionItem}>
              <h3>Ferramentas</h3>
              <ul>
                {skills.tools.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={sectionItem}>
              <h3>Front-end</h3>
              <ul>
                {skills.frontend.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={sectionItem}>
              <h3>Multidisciplinar</h3>
              <ul>
                {skills.multi.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Section>

        <Section id="exp" title="Experiência">
          <motion.div variants={sectionContainer} style={{ display: 'grid', gap: 16 }}>
            {experiences.map((job) => (
              <motion.div key={job.company + job.time} variants={sectionItem}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <a href="#" style={{ fontWeight: 600 }}>{job.company}</a>
                    <div style={{ opacity: 0.7 }}>{job.time}</div>
                  </div>
                  <p style={{ marginTop: 8 }}>{job.position}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {job.used.map((t) => (
                      <span key={t} style={{ border: '1px solid color-mix(in oklab, canvasText 12%, transparent)', padding: '4px 8px', borderRadius: 999 }}>{t}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </main>

      <motion.footer id="contato" className="footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ padding: '32px 16px', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Remember: humans first. Always.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <a href="https://linkedin.com/in/rogercamara" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:roger@monolito.cc">Email</a>
        </div>
      </motion.footer>

      <button
        id="top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', right: 16, bottom: 16, display: showTop ? 'block' : 'none' }}
      >
        Topo
      </button>
    </div>
  )
}

export default App
