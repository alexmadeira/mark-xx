import { Helmet } from 'react-helmet-async'

import _ from 'lodash'

import { HomeMasonry } from '_SRV/builder/masonry'
import { scrollController } from '_SRV/controller'

import { Hero } from './sessions/hero'

export function Home() {
  const ScrollController = scrollController()
  ScrollController.scrollTo(0, { immediate: true })

  return (
    <>
      <Helmet title="Home" />
      <Hero />
      <HomeMasonry.render />
    </>
  )
}
