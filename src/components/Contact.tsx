import { useLang } from '../context/LangContext'

const contacts = [
  {
    name: 'Email',
    handle: 'artemiistobalov@gmail.com',
    href: 'mailto:artemiistobalov@gmail.com',
  },
  {
    name: 'GitHub',
    handle: 'github.com/artemii',
    href: 'https://github.com/elArt',
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/artemii',
    href: 'https://linkedin.com/in/artemii-stobalov-453334176',
  },
]

export default function Contact() {
  const { t } = useLang()

  return (
    <>
      <section id="contact" style={s.section}>
        <p style={s.label}>{t('contact_label')}</p>
        <h2 style={s.headline}>
          {t('contact_headline_1')}<br />
          {t('contact_headline_2')}
        </h2>
        <div style={s.links}>
          {contacts.map(({ name, handle, href }) => (
            <ContactLink key={name} name={name} handle={handle} href={href} />
          ))}
        </div>
      </section>

      <footer style={s.footer}>
        <span style={s.footerText}>© 2026 Artemii Stobalov</span>
        <span style={s.footerText}>{t('footer_role')}</span>
      </footer>
    </>
  )
}

function ContactLink({ name, handle, href }: { name: string; handle: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={s.link}>
      <span style={s.linkName}>{name}</span>
      <span style={s.linkHandle}>{handle}</span>
      <span style={s.arrow}>↗</span>
    </a>
  )
}

const s: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    padding: '120px 48px 80px',
    maxWidth: 1100, margin: '0 auto',
    borderTop: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  label: {
    fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 48,
  },
  headline: {
    fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 300,
    letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 48,
  },
  links: { display: 'flex', flexDirection: 'column', gap: 2 },
  link: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 0', borderBottom: '1px solid var(--border)',
    textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 15,
  },
  linkName: { fontWeight: 400 },
  linkHandle: { fontSize: 13, color: 'var(--text-muted)' },
  arrow: { fontSize: 18 },
  footer: {
    maxWidth: 1100, margin: '0 auto', padding: '32px 48px',
    borderTop: '1px solid var(--border)',
    display: 'flex', justifyContent: 'space-between',
  },
  footerText: { fontSize: 12, color: 'var(--text-muted)' },
}
