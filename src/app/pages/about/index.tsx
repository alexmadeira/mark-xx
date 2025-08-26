import { Helmet } from 'react-helmet-async'

import { awardsFetcher, brandsFetcher, pageFetcher, usageLanguagesFetcher } from '_SRV/fetcher'

import { Awards } from './sessions/awards'
import { Brands } from './sessions/brands'
import { Languages } from './sessions/languages'
import { Movie } from './sessions/movie'
import { Presentation } from './sessions/presentation'
import { Header } from './header'

export function About() {
  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FBrands = brandsFetcher()
  const FUsageLanguages = usageLanguagesFetcher()

  FPage.fetch('about')
  FAwards.fetch('about:awards')
  FBrands.fetch('about:brands')
  FUsageLanguages.fetch('about:usage-languages')

  return (
    <>
      <Helmet title="Sobre" />
      <Header />
      <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
        <Presentation />
        <Movie />
        <Awards />
        <Languages />
        <Brands />
      </div>
    </>
  )
}
