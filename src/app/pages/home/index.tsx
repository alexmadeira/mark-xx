import _ from 'lodash'

import { ProjectDetails } from '_APP/components/project/project-details'
import { masonry } from '_SRV/builder/masonry'
import { mapperProject } from '_SRV/mapper'
import { useFetcherProjects } from '_STR/useFetcherProjects'

import { Hero } from './sessions/hero'

export function Home() {
  const HomeMasonry = masonry('home')
  const pojectMapper = mapperProject()

  const projects = useFetcherProjects((st) => st.data.list['home:projects'])

  const masonryProjects = projects?.map(pojectMapper.toMasonry)

  return (
    <>
      <Hero />
      <HomeMasonry.render contents={masonryProjects}>
        <ProjectDetails />
      </HomeMasonry.render>
    </>
  )
}
