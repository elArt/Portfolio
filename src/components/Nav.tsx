import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'

export default function Nav() {
  const [active,   setActive]   = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sm,       setSm]       = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const fn = () => setSm(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* close menu on any scroll */
  useEffect(() => {
    if (!menuOpen) return
    const fn = () => setMenuOpen(false)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [menuOpen])

  const links = [
    { href: '#about',    key: 'nav_about' },
    { href: '#journey',  key: 'nav_journey' },
    { href: '#projects', key: 'nav_projects' },
    { href: '#contact',  key: 'nav_contact' },
  ]

  return (
    <>
      <nav style={{ ...s.nav, padding: sm ? '14px 20px' : '20px 48px' }}>
        {/* Logo */}
        <a href="#about" style={{ ...s.logo, fontSize: sm ? 13 : 15 }}>
          {sm ? 'A. Stobalov' : 'Artemii Stobalov'}
        </a>

        {/* Desktop links */}
        {!sm && (
          <ul style={s.list}>
            {links.map(({ href, key }) => (
              <li key={href}>
                <a href={href} style={{
                  ...s.link,
                  color: active === href.slice(1) ? 'var(--text)' : 'var(--text-secondary)',
                }}>
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right controls */}
        <div style={{ display:'flex', alignItems:'center', gap: sm ? 10 : 0 }}>
          <button style={s.langBtn} onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}>
            {lang === 'uk' ? 'EN' : 'UA'}
          </button>

          {/* Hamburger button */}
          {sm && (
            <button
              style={s.burger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span style={{
                ...s.bar,
                transform: menuOpen ? 'rotate(45deg) translate(0px, 6px)' : 'none',
              }}/>
              <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}/>
              <span style={{
                ...s.bar,
                transform: menuOpen ? 'rotate(-45deg) translate(0px, -6px)' : 'none',
              }}/>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {sm && (
        <div style={{
          ...s.dropdown,
          opacity:    menuOpen ? 1 : 0,
          transform:  menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}>
          {links.map(({ href, key }) => (
            <a
              key={href}
              href={href}
              style={{
                ...s.dropLink,
                color: active === href.slice(1) ? 'var(--text)' : 'var(--text-secondary)',
                background: active === href.slice(1) ? 'var(--surface)' : 'transparent',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

const s: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(12,12,12,0.9)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border)',
  },
  logo: {
    fontWeight: 500, letterSpacing: '0.02em',
    color: 'var(--text)', textDecoration: 'none',
  },
  list: { display: 'flex', gap: 32, listStyle: 'none' },
  link: {
    fontSize: 13, fontWeight: 400, letterSpacing: '0.03em',
    textDecoration: 'none', transition: 'color var(--transition)',
  },
  langBtn: {
    fontFamily: 'inherit',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'color var(--transition), border-color var(--transition)',
  },
  burger: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', gap: 5,
    width: 36, height: 36,
    background: 'none', border: '1px solid var(--border)',
    borderRadius: 8, cursor: 'pointer', padding: 0,
    fontFamily: 'inherit',
  },
  bar: {
    display: 'block', width: 16, height: 1.5,
    background: 'var(--text-secondary)', borderRadius: 2,
    transition: 'transform 0.25s ease, opacity 0.2s ease',
  },
  dropdown: {
    position: 'fixed', top: 57, left: 0, right: 0, zIndex: 99,
    background: 'rgba(12,12,12,0.97)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    padding: '8px 0',
  },
  dropLink: {
    display: 'block',
    padding: '14px 24px',
    fontSize: 15, fontWeight: 400, letterSpacing: '0.03em',
    textDecoration: 'none',
    borderRadius: 0,
    transition: 'color 0.15s, background 0.15s',
  },
}
