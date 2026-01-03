import { ProjectDetails } from '_APP/components/project/project-details'
import _ from 'lodash'

import { masonry } from '_SRV/builder/masonry'
import { ProjectMapper } from '_SRV/mapper/project-mapper'

import { useFetcherProjects } from '_STR/useFetcherProjects'

import { Hero } from './sessions/hero'

export function Home() {
  const HomeMasonry = masonry('home')

  const projects = useFetcherProjects((st) => st.data.list['home:projects'])

  const masonryProjects = projects?.map(ProjectMapper.toMasonry)

  return (
    <>
      <Hero />
      <HomeMasonry.render contents={masonryProjects}>
        <ProjectDetails />
      </HomeMasonry.render>
    </>
  )
}
