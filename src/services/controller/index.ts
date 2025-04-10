import type { IHeroBanner } from '@/services/controller/hero-banner-controller'
import type { IRoute } from '@/services/controller/route'

import { defaultHeroBannerProps, defaultRouteProps } from './_defaults'
import { HeroBannerController } from './hero-banner-controller'
import { RouteController } from './route-controller'

let controllerHeroBanner: IHeroBanner
let controllerRoute: IRoute

export function heroBannerController() {
  if (controllerHeroBanner) return controllerHeroBanner

  return (controllerHeroBanner = HeroBannerController.create(defaultHeroBannerProps))
}

export function routeController() {
  if (controllerRoute) return controllerRoute

  return (controllerRoute = RouteController.create(defaultRouteProps))
}
