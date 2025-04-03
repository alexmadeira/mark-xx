import { heroBannerController } from '_SRV/controller'

import { Banner } from './banner'
import { Content } from './content'
import { Title } from './title'

export function Hero() {
  heroBannerController({
    start: 'web',
    delay: 3000,
    speed: 120,
    deletionSpeed: 60,
  })
  return (
    <div className="relative flex h-[85vh] max-h-[80vw] min-h-[400px] flex-col items-center bg-mark-600">
      <Title />
      <Content />
      <Banner />
    </div>
  )
}
