import { useEffect } from 'react'

import { veronica } from '_SRV/api'
import { colorController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const APIVeronica = veronica()
  const CLHeroColor = colorController('hero')

  useEffect(() => {
    async function fetchTecnologies() {
      const res = await APIVeronica.query('mark-xx:tecnologies', 'tecnologies')

      console.log('Tecnologies fetched:', res)
    }
    setTimeout(() => {
      fetchTecnologies()
    }, 1000)
  }, [])
  const content = useHero((st) => st.data.current.content)

  return (
    <div
      style={{ ...CLHeroColor.betterContrast(content.color) }}
      className="relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center pt-[var(--header-measure-height)]"
    >
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
