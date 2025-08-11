import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'
import _ from 'lodash'

import { HomeMasonry } from '_SRV/builder/masonry'
import { scrollingController } from '_SRV/controller'
import { projectsFetcher } from '_SRV/fetcher'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useProjects } from '_STR/fetcher/useProjects'

import { Hero } from './sessions/hero'

export function Home() {
  const CLScrolling = scrollingController()
  const Projects = projectsFetcher()

  Projects.fetch('home-projects', CLScrolling.resize)

  const projects = useProjects((st) => st.data.list['home-projects'])
  const masonryProjects = projects?.map(ProjectMapper.toMasonry)

  return (
    <>
      <Helmet title="Home" />
      <Hero />
      <HomeMasonry.render contents={masonryProjects}>
        <ProjectDetails />
      </HomeMasonry.render>
    </>
  )
}
