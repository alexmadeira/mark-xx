import { useEffect, useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { preFetcher, projectFetcher } from '_SRV/fetcher'

import { useRoute } from '_STR/useRoute'

import { Banner } from './sessions/banner'
import { Blocks } from './sessions/blocks'
import { Header } from './sessions/header'
import { Informations } from './sessions/informations'

export function Project() {
  const FProject = projectFetcher()
  const FPreFetcher = preFetcher()

  const slug = useRef<string | null>(null)

  const projectSlug = useRoute((st) => st.data.params.slug)
  if (projectSlug) slug.current = projectSlug

  useEffect(() => {
    if (!slug.current) return

    FPreFetcher.fetch(FProject.prefetch(slug.current))
  }, [slug.current])

  return (
    <>
      <Banner />
      <div className={twMerge('relative top-0 left-0 z-2 w-full space-y-[clamp(2.5rem,3vw,8rem)]')}>
        <Header />
        <Informations />
        <Blocks />
      </div>
    </>
  )
}
