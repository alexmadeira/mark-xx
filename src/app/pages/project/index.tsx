import { Helmet } from 'react-helmet-async'

import { twMerge } from 'tailwind-merge'

import { routeController } from '_SRV/controller'
import { preFetcher, projectFetcher } from '_SRV/fetcher'

import { Banner } from './sessions/banner'
import { Header } from './sessions/header'
import { Informations } from './sessions/informations'
import { Previews } from './sessions/previews'

export function Project() {
  const CLRoute = routeController()
  const FProject = projectFetcher()
  const FPreFetcher = preFetcher()

  FPreFetcher.fetch(FProject.prefetch(CLRoute.params.slug))

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
