import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'

import { ProjectsMasonry } from '_SRV/builder/masonry'

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
