import type { IHeroBanner, THeroBannerProps } from '@/services/controller/hero-banner-controller'

import { ZHeroBannerProps } from '@/services/controller/hero-banner-controller'

import { HeroBannerController } from './hero-banner-controller'

let controllerHeroBanner: IHeroBanner

export function heroBannerController(data?: THeroBannerProps) {
  if (!data && !controllerHeroBanner) throw new Error('HeroBannerController is not initialized')
  if (!data && !!controllerHeroBanner) return controllerHeroBanner

  const props = ZHeroBannerProps.parse(data)

  controllerHeroBanner = new HeroBannerController(props)
  return controllerHeroBanner
}
