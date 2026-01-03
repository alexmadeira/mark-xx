import { useEffect } from 'react'

import { twMerge } from 'tailwind-merge'

import { preFetcher, projectFetcher } from '_SRV/fetcher'

import { useRoute } from '_STR/useRoute'

import { Banner } from './sessions/banner'
import { Header } from './sessions/header'
import { Informations } from './sessions/informations'
import { Previews } from './sessions/previews'

export function Project() {
  const FProject = projectFetcher()
  const FPreFetcher = preFetcher()

  const projectSlug = useRoute((st) => st.data.params.slug)

  useEffect(() => {
    FPreFetcher.fetch(FProject.prefetch(projectSlug))
  }, [projectSlug])

  return (
    <>
      <Banner />
      <div className={twMerge('relative top-0 left-0 z-2 w-full space-y-[clamp(2.5rem,3vw,8rem)]', 'mt-32')}>
        <Header />
        <Informations />
        <Previews />
      </div>
    </>
  )
}
