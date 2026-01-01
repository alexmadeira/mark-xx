import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'

import { masonry } from '_SRV/builder/masonry'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'

import { Header } from './sessions/header'

export function Projects() {
  const ProjectsMasonry = masonry('projects')

  const projects = useFetcherProjects((st) => st.data.list['all:projects'])
  const masonryProjects = projects?.map(ProjectMapper.toMasonry)

  return (
    <>
      <Helmet title="Projetos" />
      <Header />
      <div className="my-[clamp(1rem,_4vw,_5rem)] w-full">
        <ProjectsMasonry.render contents={masonryProjects}>
          <ProjectDetails />
        </ProjectsMasonry.render>
      </div>
    </>
  )
}
