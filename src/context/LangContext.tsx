import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'uk' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = {
  uk: {
    nav_about: 'Про мене',
    nav_journey: 'Шлях',
    nav_projects: 'Проекти',
    nav_contact: 'Контакти',
    about_label: 'Про мене',
    about_body: '5 років досвіду у frontend-розробці. Працював над адаптивними рекламними креативами під різні девайси та формати, розробляв різноманітні проекти з використанням HTML, CSS, SCSS/Sass, JavaScript ES6+, React та TypeScript. Будую зручні інтерфейси, інтерактивні 3D-сцени та плавні анімації. У вільний час вивчаю Angular, NgRx та RxJS — розробляю сайд-проекти для поглиблення знань. Захоплений чистою архітектурою та якісним кодом.',
    projects_title: 'Проекти',
    projects_count: 'роботи',
    contact_label: 'Контакти',
    contact_headline_1: 'Поспілкуємось',
    contact_headline_2: 'разом.',
    modal_stack: 'Стек',
    modal_open: 'Відкрити проект →',
    modal_close: 'Закрити',
    detail_tech: 'Технології',
    detail_year: 'Рік',
    detail_links: 'Посилання',
    detail_open: 'Відкрити ↗',
    footer_role: 'Frontend Developer',
    journey_kinder: 'Дитячий садок',
    journey_school: 'Загальноосвітня школа',
    journey_uni: 'ДІІТ',
    journey_uni_sub: 'Факультет автоматики та електроприводу',
    journey_metro: 'Дніпропетровський метрополітен',
    journey_loopme_sub: '2021 — сьогодні',
  },
  en: {
    nav_about: 'About',
    nav_journey: 'Journey',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    about_label: 'About',
    about_body: '5 years of frontend development experience. Built responsive ad creatives for various devices and formats, developed diverse projects using HTML, CSS, SCSS/Sass, JavaScript ES6+, React and TypeScript. Focused on clean interfaces, interactive 3D scenes and smooth animations. In my spare time I study Angular, NgRx and RxJS — building side projects to deepen my knowledge. Passionate about clean architecture and quality code.',
    projects_title: 'Projects',
    projects_count: 'works',
    contact_label: 'Contact',
    contact_headline_1: "Let's work",
    contact_headline_2: 'together.',
    modal_stack: 'Stack',
    modal_open: 'Open project →',
    modal_close: 'Close',
    detail_tech: 'Technologies',
    detail_year: 'Year',
    detail_links: 'Links',
    detail_open: 'Open ↗',
    footer_role: 'Frontend Developer',
    journey_kinder: 'Kindergarten',
    journey_school: 'Secondary School',
    journey_uni: 'DIIT',
    journey_uni_sub: 'Automation & Electric Drive Faculty',
    journey_metro: 'Dnipro Metro',
    journey_loopme_sub: '2021 — present',
  },
}

const LangContext = createContext<LangContextValue>({
  lang: 'uk',
  setLang: () => { },
  t: (k) => k,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem('lang') as Lang) || 'uk'
  )

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (key: string) => translations[lang][key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
