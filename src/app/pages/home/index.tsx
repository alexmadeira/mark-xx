import { Helmet } from 'react-helmet-async'

import _ from 'lodash'

import { HomeMasonry } from '_SRV/builder/masonry'

import { Hero } from './components/hero'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <div>
        <Hero />
        <div className="grid h-full w-full flex-1 grid-flow-row-dense auto-rows-[calc(100vw/6)] grid-cols-3 gap-4 p-4 md:grid-cols-4 xl:grid-cols-5">
          <HomeMasonry.render />
        </div>
      </div>
    </>
  )
}
