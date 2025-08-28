import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'
import _ from 'lodash'

import { masonry } from '_SRV/builder/masonry'
import { scrollingController } from '_SRV/controller'
import { pageFetcher, projectsFetcher } from '_SRV/fetcher'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'

import { Hero } from './sessions/hero'

export function Home() {
  const HomeMasonry = masonry('home')
  const CLScrolling = scrollingController()

  const FPage = pageFetcher()
  const FProjects = projectsFetcher()

  const projects = useFetcherProjects((st) => st.data.list['home-projects'])
  const masonryProjects = projects?.map(ProjectMapper.toMasonry)

  useEffect(() => {
    FPage.fetch('home')
    FProjects.fetch('home-projects', {
      callback: CLScrolling.resize,
      filter: {
        highlight: true,
      },
    })
  }, [])

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
