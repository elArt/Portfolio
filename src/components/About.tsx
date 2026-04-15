import { useLang } from '../context/LangContext'

const skills = ['React', 'TypeScript', 'Three.js', 'RxJS', 'Angular', 'Node.js', 'GSAP', 'WebSockets']

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" style={s.section}>
      <p style={s.label}>{t('about_label')}</p>
      <h1 style={s.headline}>
        Middle Frontend<br />
        <em style={s.muted}>Developer.</em>
      </h1>
      <p style={s.body}>{t('about_body')}</p>
      <div style={s.tagsRow}>
        {skills.map((skill) => (
          <span key={skill} style={s.tag}>{skill}</span>
        ))}
      </div>
    </section>
  )
}

const s: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    padding: '120px 48px 80px',
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 48,
  },
  headline: {
    fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300,
    lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 40,
  },
  muted: { fontStyle: 'normal', color: 'var(--text-muted)' },
  body: {
    maxWidth: 560, fontSize: 15, lineHeight: 1.75,
    color: 'var(--text-secondary)', marginBottom: 48,
  },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag: {
    fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)',
    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
    borderRadius: 6, padding: '5px 12px',
  },
}
