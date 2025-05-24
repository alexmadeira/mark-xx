import { Helmet } from 'react-helmet-async'

import { ProjectDetails } from '_APP/components/project/project-details'
import _ from 'lodash'

import { HomeMasonry } from '_SRV/builder/masonry'

import { Hero } from './sessions/hero'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <Hero />
      <HomeMasonry.render>
        <ProjectDetails />
      </HomeMasonry.render>
    </>
  )
}
