import { useEffect } from 'react'

import { colorController, heroController } from '_SRV/controller'
import { technologiesFetcher } from '_SRV/fetcher'

import { useHero } from '_STR/useHero'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const CLHeroColor = colorController('hero')
  const CLHero = heroController()

  const FTechnologies = technologiesFetcher()

  useEffect(() => {
    FTechnologies.fetch('banner', {
      callback: CLHero.start,
    })
  }, [])

  const color = useHero((st) => st.data.current?.color)

  return (
    <div
      style={{ ...CLHeroColor.betterContrast(color) }}
      className="relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center pt-[var(--header-measure-height)]"
    >
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
