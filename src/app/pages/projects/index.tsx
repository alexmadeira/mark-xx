import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'

import { masonry } from '_SRV/builder/masonry'
import { scrollingController } from '_SRV/controller'
import { pageFetcher, projectsFetcher } from '_SRV/fetcher'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useProjects } from '_STR/fetcher/useProjects'

import { Header } from './sessions/header'

export function Projects() {
  const ProjectsMasonry = masonry('projects')
  const CLScrolling = scrollingController()

  const FPage = pageFetcher()
  const FProjects = projectsFetcher()

  const projects = useProjects((st) => st.data.list.projects)
  const masonryProjects = projects?.map(ProjectMapper.toMasonry)

  useEffect(() => {
    FPage.fetch('projects')
    FProjects.fetch('projects', { callback: CLScrolling.resize })
  }, [])

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
