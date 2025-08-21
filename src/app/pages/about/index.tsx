import { Helmet } from 'react-helmet-async'

import { awardsFetcher, pageFetcher, usageLanguagesFetcher } from '_SRV/fetcher'

import { Awards } from './sessions/awards'
import { Brands } from './sessions/brands'
import { Languages } from './sessions/languages'
import { Movie } from './sessions/movie'
import { Presentation } from './sessions/presentation'
import { Header } from './header'

export function About() {
  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FUsageLanguages = usageLanguagesFetcher()

  FPage.fetch('about')
  FAwards.fetch('about:awards')
  FUsageLanguages.fetch('about:usage-languages')

  return (
    <>
      <Helmet title="Sobre" />
      <div className="w-full pt-[100px]">
        <Header />
        <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
          <Presentation />
          <Movie />
          <Awards />
          <Languages />
          <Brands />
        </div>
      </div>
    </>
  )
}
