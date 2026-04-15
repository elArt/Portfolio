import { useEffect, useState } from 'react'
import { Project } from '../types'
import { useLang } from '../context/LangContext'

interface Props {
  project: Project | null
  onClose: () => void
  onOpen: (project: Project) => void
}

export default function Modal({ project, onClose, onOpen }: Props) {
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

  if (!project) return null

  const short = lang === 'en' && project.short_en ? project.short_en : project.short

  return (
    <div
      style={{ ...s.overlay, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div style={{
        ...s.modal,
        padding:      sm ? 24 : 40,
        borderRadius: sm ? 16 : 16,
        /* On mobile: sit at bottom like a sheet */
        ...(sm ? {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          maxWidth: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
        } : {}),
      }}>
        {/* drag handle on mobile */}
        {sm && (
          <div style={{
            width: 36, height: 4, background: 'var(--border)',
            borderRadius: 2, margin: '0 auto 20px',
          }}/>
        )}

        <div style={s.top}>
          <h3 style={{ ...s.title, fontSize: sm ? 19 : 24 }}>{project.name}</h3>
          <button style={s.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <p style={{ ...s.desc, fontSize: sm ? 13 : 14 }}>{short}</p>

        <p style={s.stackLabel}>{t('modal_stack')}</p>
        <div style={s.stackRow}>
          {project.stack.map((item) => (
            <span key={item} style={s.stackTag}>{item}</span>
          ))}
        </div>

        <div style={{ ...s.actions, flexDirection: sm ? 'column' : 'row' }}>
          <button style={{ ...s.btnPrimary, padding: sm ? '14px 20px' : '12px 20px' }}
            onClick={() => onOpen(project)}>
            {t('modal_open')}
          </button>
          <button style={{ ...s.btnSecondary, padding: sm ? '14px 20px' : '12px 20px' }}
            onClick={onClose}>
            {t('modal_close')}
          </button>
        </div>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
    </svg>
  )
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'opacity var(--transition)',
  },
  modal: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    maxWidth: 520, width: '100%',
  },
  top: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24, gap:16 },
  title: { fontWeight: 500, letterSpacing: '-0.02em' },
  closeBtn: {
    width:32, height:32, border:'1px solid var(--border)', borderRadius:'50%',
    background:'none', color:'var(--text-secondary)', cursor:'pointer',
    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
    fontFamily:'inherit',
  },
  desc: { color:'var(--text-secondary)', lineHeight:1.7, marginBottom:28 },
  stackLabel: {
    fontSize:11, fontWeight:500, letterSpacing:'0.1em',
    textTransform:'uppercase', color:'var(--text-muted)', marginBottom:12,
  },
  stackRow: { display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 },
  stackTag: {
    fontSize:12, fontWeight:500, color:'var(--text-secondary)',
    background:'var(--tag-bg)', border:'1px solid var(--tag-border)',
    borderRadius:6, padding:'5px 12px',
  },
  actions: { display:'flex', gap:10 },
  btnPrimary: {
    flex:1, background:'var(--text)', color:'var(--bg)',
    border:'none', borderRadius:8, fontFamily:'inherit', fontSize:13, fontWeight:500,
    cursor:'pointer', letterSpacing:'0.02em',
  },
  btnSecondary: {
    flex:1, background:'none', color:'var(--text-secondary)',
    border:'1px solid var(--border)', borderRadius:8, fontFamily:'inherit',
    fontSize:13, cursor:'pointer',
  },
}
