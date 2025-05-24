import { Helmet } from 'react-helmet-async'

import { ProjectsMasonry } from '_SRV/builder/masonry'

import { ProjectDetails } from './components/project-details'
import { Header } from './sessions/header'

export function Projects() {
  return (
    <>
      <Helmet title="Projetos" />
      <Header />
      <div className="my-[clamp(1rem,_4vw,_5rem)] w-full">
        <ProjectsMasonry.render>
          <ProjectDetails />
        </ProjectsMasonry.render>
      </div>
    </>
  )
}
