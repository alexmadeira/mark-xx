import { Helmet } from 'react-helmet-async'

import _ from 'lodash'

import { HomeMasonry } from '_SRV/builder/masonry'

import { ProjectDetails } from './components/project-details'
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
