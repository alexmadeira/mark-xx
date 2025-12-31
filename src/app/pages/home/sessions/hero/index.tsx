import { useEffect } from 'react'

import { PageHeader } from '_APP/components/ui-element/page/header'
import { twMerge } from 'tailwind-merge'

import { colorController, heroController } from '_SRV/controller'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'
import { useHero } from '_STR/useHero'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const CLHeroColor = colorController('hero')
  const CLHero = heroController()
  const status = useFetcherTechnologies((st) => st.data.status)
  useEffect(() => {
    if (status === 'loaded') CLHero.start()
  }, [status])

  const color = useHero((st) => st.data.current?.color)
  CLHeroColor.betterContrast('hero', color)

  return (
    <PageHeader.Root
      page="home"
      className={twMerge('relative flex h-[45vh] flex-col items-center', 'sm:h-[85vh]', 'lg:h-[90vh]', 'bg-mark-700')}
    >
      <Title />
      <Banner />
      <Content />
    </PageHeader.Root>
  )
}
