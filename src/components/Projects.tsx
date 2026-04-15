import { Project } from '../types'
import { projects } from '../data/projects'
import { useLang } from '../context/LangContext'
import ProjectCard from './ProjectCard'

interface Props {
  onCardClick: (project: Project) => void
}

export default function Projects({ onCardClick }: Props) {
  const { t } = useLang()

  return (
    <section id="projects" style={s.section}>
      <div style={s.header}>
        <h2 style={s.title}>{t('projects_title')}</h2>
        <span style={s.count}>
          {String(projects.length).padStart(2, '0')} {t('projects_count')}
        </span>
      </div>
      <div style={s.grid}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => onCardClick(project)}
          />
        ))}
      </div>
    </section>
  )
}

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: '120px 48px 80px',
    maxWidth: 1100,
    margin: '0 auto',
  },
  header: {
    display: 'flex', alignItems: 'flex-end',
    justifyContent: 'space-between', marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em' },
  count: { fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 1,
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
  },
}
