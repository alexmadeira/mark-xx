import type { IHeroBanner } from '@/services/controller/hero-banner-controller'

import { HeroBannerController } from './hero-banner-controller'

let controllerHeroBanner: IHeroBanner

export function heroBannerController() {
  if (controllerHeroBanner) return controllerHeroBanner

  controllerHeroBanner = new HeroBannerController({ start: 'web', delay: 3000, speed: 120, deletionSpeed: 60 })
  return controllerHeroBanner
}
