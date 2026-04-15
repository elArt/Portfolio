import { useState } from 'react'
import { Project } from '../types'
import { useLang } from '../context/LangContext'

interface Props {
  project: Project
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLang()

  const short = lang === 'en' && project.short_en ? project.short_en : project.short

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...s.card,
        background: hovered ? 'var(--surface-hover)' : 'var(--surface)',
      }}
      aria-label={project.name}
    >
      <div style={s.top}>
        <span style={s.num}>0{index + 1}</span>
        <span style={{
          ...s.arrow,
          borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
          transform: hovered ? 'translate(2px,-2px)' : 'none',
        }}>
          <ArrowIcon />
        </span>
      </div>

      <h3 style={s.name}>{project.name}</h3>
      <p style={s.desc}>{short}</p>

      <div style={s.tags}>
        {project.stack.slice(0, 3).map((t) => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
        {project.stack.length > 3 && (
          <span style={s.tag}>+{project.stack.length - 3}</span>
        )}
      </div>
    </button>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
      <line x1="1" y1="11" x2="11" y2="1" />
      <polyline points="5,1 11,1 11,7" />
    </svg>
  )
}

const s: Record<string, React.CSSProperties> = {
  card: {
    padding: '36px 32px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    border: 'none',
    textAlign: 'left',
    color: 'inherit',
    outline: 'none',
    transition: 'background var(--transition)',
    fontFamily: 'inherit',
  },
  top: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
  num: { fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 500 },
  arrow: {
    width: 28, height: 28,
    border: '1px solid var(--border)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    transition: 'border-color var(--transition), transform var(--transition)',
  },
  name: { fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.3 },
  desc: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' },
  tag: {
    fontSize: 11, fontWeight: 500, color: 'var(--text-muted)',
    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
    borderRadius: 4, padding: '3px 8px',
  },
}
