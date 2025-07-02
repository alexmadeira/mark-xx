import { heroController } from '_SRV/controller'

import { useElement } from '_STR/useElement'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const CLHero = heroController()
  const header = useElement((st) => st.data.header)

  CLHero.start()

  return (
    <div
      className="relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center"
      style={{ paddingTop: `${header.height}px` }}
    >
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
