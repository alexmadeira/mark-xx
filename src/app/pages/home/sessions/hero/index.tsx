import { useEffect } from 'react'

import { heroController } from '_SRV/controller'

import { useElement } from '_STR/useElement'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const CLHero = heroController()
  const header = useElement((st) => st.data.header)

  useEffect(() => {
    CLHero.start()
    return () => CLHero.stop()
  }, [])

  return (
    <div
      className="bg-mark-600 relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center"
      style={{ paddingTop: `${header?.height ?? 0}px` }}
    >
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
