import { Helmet } from 'react-helmet-async'

import { ProjectsMasonry } from '_SRV/builder/masonry'
import { scrollController } from '_SRV/controller'

import { Header } from './sessions/header'

export function Projects() {
  const ScrollController = scrollController()
  ScrollController.scrollTo(0, { immediate: true })
  return (
    <>
      <Helmet title="Projetos" />
      <Header />
      <div className="my-[clamp(1rem,_4vw,_5rem)] w-full">
        <ProjectsMasonry.render />
      </div>
    </>
  )
}
