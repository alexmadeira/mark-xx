import { ProjectDetails } from '_APP/components/project/project-details'

import { masonry } from '_SRV/builder/masonry'
import { mapperProject } from '_SRV/mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'

import { Header } from './sessions/header'

export function Projects() {
  const pojectMapper = mapperProject()
  const ProjectsMasonry = masonry('projects')

  const projects = useFetcherProjects((st) => st.data.list['all:projects'])
  const masonryProjects = projects?.map(pojectMapper.toMasonry)

  return (
    <>
      <Header />
      <div className="mt-session flex w-full flex-col">
        <ProjectsMasonry.render contents={masonryProjects}>
          <ProjectDetails />
        </ProjectsMasonry.render>
      </div>
    </>
  )
}
