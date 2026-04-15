import { useEffect, useState } from 'react'
import { Project } from '../types'
import { useLang } from '../context/LangContext'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: Props) {
  const isOpen = project !== null
  const { lang, t } = useLang()
  const [sm, setSm] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false)

  useEffect(() => {
    const fn = () => setSm(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const description = project
    ? (lang === 'en' && project.description_en ? project.description_en : project.description)
    : ''

  return (
    <div style={{ ...s.panel, transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}>
      {project && (
        <>
          <div style={{ ...s.header, padding: sm ? '14px 16px' : '20px 48px' }}>
            <button style={s.backBtn} onClick={onClose} aria-label="Back">
              <BackIcon />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ ...s.name, fontSize: sm ? 15 : 18 }}>{project.name}</h2>
              <div style={s.stackRow}>
                {project.stack.map((item) => (
                  <span key={item} style={s.stackTag}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...s.body, padding: sm ? '24px 16px' : '64px 48px' }}>
            {/* Hero */}
            <div style={{ ...s.hero, marginBottom: sm ? 24 : 48 }}>
              {project.demoUrl ? (
                <>
                  <iframe
                    src={project.demoUrl}
                    title={project.name}
                    style={s.iframe}
                    allowFullScreen
                    loading="lazy"
                  />
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={s.heroLink}
                  >
                    {t('detail_open')}
                  </a>
                </>
              ) : project.imageUrl ? (
                <img src={project.imageUrl} alt={project.name} style={s.heroImg} />
              ) : (
                <span style={s.heroPlaceholder}>{project.name}</span>
              )}
            </div>

            {/* Content — 2-col on desktop, stacked on mobile */}
            <div style={{
              ...s.content,
              gridTemplateColumns: sm ? '1fr' : '1fr 280px',
              gap: sm ? 32 : 48,
            }}>
              <div
                style={{ ...s.description, fontSize: sm ? 14 : 15 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <aside>
                <div style={s.sideSection}>
                  <p style={s.sideLabel}>{t('detail_tech')}</p>
                  {/* On mobile, render as flex row of tags */}
                  {sm ? (
                    <div style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
                      {project.stack.map(item => (
                        <span key={item} style={s.stackTag}>{item}</span>
                      ))}
                    </div>
                  ) : (
                    project.stack.map(item => (
                      <div key={item} style={s.sideTech}>{item}</div>
                    ))
                  )}
                </div>
                <div style={s.sideSection}>
                  <p style={s.sideLabel}>{t('detail_year')}</p>
                  <div style={s.sideTech}>{project.year}</div>
                </div>
                {project.githubUrl && (
                  <div style={s.sideSection}>
                    <p style={s.sideLabel}>{t('detail_links')}</p>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" style={s.sideLink}>
                      GitHub ↗
                    </a>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
      <polyline points="9,1 3,7 9,13" />
    </svg>
  )
}

const s: Record<string, React.CSSProperties> = {
  panel: {
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'var(--bg)', overflowY: 'auto',
    transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
  },
  header: {
    position: 'sticky', top: 0,
    background: 'rgba(12,12,12,0.92)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', gap: 16, zIndex: 10,
  },
  backBtn: {
    width: 36, height: 36, border: '1px solid var(--border)', borderRadius: '50%',
    background: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, fontFamily: 'inherit',
  },
  name: { fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 },
  stackRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  stackTag: {
    fontSize: 11, fontWeight: 500, color: 'var(--text-muted)',
    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
    borderRadius: 4, padding: '3px 8px',
  },
  body: { maxWidth: 1100, margin: '0 auto' },
  hero: {
    width: '100%', aspectRatio: '16/9',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', position: 'relative',
  },
  iframe: { width: '100%', height: '100%', border: 'none', display: 'block' },
  heroLink: {
    position: 'absolute', top: 12, right: 12,
    padding: '6px 14px',
    background: 'rgba(12,12,12,0.8)', backdropFilter: 'blur(8px)',
    border: '1px solid var(--border)', borderRadius: 6,
    fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)',
    textDecoration: 'none', letterSpacing: '0.04em',
  },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  heroPlaceholder: { fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em' },
  content: { display: 'grid' },
  description: { color: 'var(--text-secondary)', lineHeight: 1.8 },
  sideSection: { marginBottom: 24 },
  sideLabel: {
    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10,
  },
  sideTech: {
    fontSize: 13, color: 'var(--text-secondary)',
    padding: '8px 12px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: 6, marginBottom: 5,
  },
  sideLink: {
    display: 'block', fontSize: 13, color: 'var(--text-secondary)',
    padding: '8px 12px', background: 'var(--surface)',
    border: '1px solid var(--border)', borderRadius: 6, marginBottom: 5,
    textDecoration: 'none',
  },
}
