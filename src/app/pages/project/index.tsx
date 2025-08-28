import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { twMerge } from 'tailwind-merge'

import { routeController, scrollingController } from '_SRV/controller'
import { projectFetcher } from '_SRV/fetcher'

import { Banner } from './sessions/banner'
import { Header } from './sessions/header'
import { Informations } from './sessions/informations'
import { Previews } from './sessions/previews'

export function Project() {
  const CLRoute = routeController()
  const CLScrolling = scrollingController()
  const FProject = projectFetcher()

  useEffect(() => {
    FProject.fetch(CLRoute.params.slug, {
      callback: CLScrolling.resize,
    })
  }, [])

  return (
    <>
      <Helmet title="Project" />
      <Banner />
      <div className={twMerge('relative top-0 left-0 z-2 w-full space-y-[clamp(2.5rem,3vw,8rem)]', 'mt-32')}>
        <Header />
        <Informations />
        <Previews />
      </div>
    </>
  )
}
