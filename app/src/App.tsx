import { useEffect, useRef, useState } from 'react'
import './App.css'

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

function App() {
  const [isDark, toggleDark] = useDarkMode()
  const introRef = useRef<HTMLElement | null>(null)
  const topButtonRef = useRef<HTMLButtonElement | null>(null)
  const handRef = useRef<HTMLSpanElement | null>(null)
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

  useEffect(() => {
    const hand = handRef.current
    if (!hand) return
    const add = () => hand.classList.add('wave')
    const remove = () => hand.classList.remove('wave')

    const timer = window.setTimeout(() => {
      add()
      window.setTimeout(remove, 2000)
    }, 1000)

    hand.addEventListener('mouseover', add)
    hand.addEventListener('mouseout', remove)

    return () => {
      window.clearTimeout(timer)
      hand.removeEventListener('mouseover', add)
      hand.removeEventListener('mouseout', remove)
    }
  }, [])

  return (
    <>
      <header className="intro" ref={introRef}>
        <h1 className="intro__hello">
          Olá!
          <span ref={handRef} className="emoji wave-hand animated" />
        </h1>

        <h2 className="intro__tagline">
          Olá, <span className="name">Agora você pode conhecer meus trabalhos através do site</span>,
          wwww.rogerverso.site <span className="emoji technologist" />
        </h2>

        <h3 className="intro__contact">
          <span>Entre em contato </span>
          <span className="emoji pointer" />
          <span>
            <a href="mailto:roger@monolito.cc" target="_blank" className="highlight-link" rel="noreferrer">
              roger.camara@outlook.com
            </a>
          </span>
        </h3>

        <button
          id="toggle"
          type="button"
          onClick={toggleDark}
          aria-pressed={isDark}
          style={{ marginTop: 16 }}
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <button
        id="top-button"
        ref={topButtonRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          display: showTop ? 'block' : 'none',
        }}
      >
        Topo
      </button>
    </>
  )
}

export default App
