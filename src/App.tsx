import { useState } from 'react'
import { Project } from './types'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Journey from './components/Journey'
import Modal from './components/Modal'
import ProjectDetail from './components/ProjectDetail'

export default function App() {
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [detailProject, setDetailProject] = useState<Project | null>(null)

  const openModal = (project: Project) => setModalProject(project)

  const closeModal = () => setModalProject(null)

  const openDetail = (project: Project) => {
    setModalProject(null)
    setDetailProject(project)
  }

  const closeDetail = () => setDetailProject(null)

  return (
    <LangProvider>
      <Nav />
      <main>
        <About />
        <Journey />
        <Projects onCardClick={openModal} />
        <Contact />
      </main>

      <Modal
        project={modalProject}
        onClose={closeModal}
        onOpen={openDetail}
      />

      <ProjectDetail
        project={detailProject}
        onClose={closeDetail}
      />
    </LangProvider>
  )
}
