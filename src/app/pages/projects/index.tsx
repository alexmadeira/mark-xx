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
      <Header />
      <div className="mt-session flex w-full flex-col md:bg-blue-500">
        <ProjectsMasonry.render contents={masonryProjects}>
          <ProjectDetails />
        </ProjectsMasonry.render>
      </div>
    </>
  )
}
