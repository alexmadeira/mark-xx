import { heroController } from '_SRV/controller'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  const CLHero = heroController()

  CLHero.start()

  return (
    <div className="relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center pt-[var(--header-measure-height)]">
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
