import { defaultHeroBannerProps, defaultRouteProps, defaultScrollProps } from './_defaults'
import { HeroBannerController } from './hero-banner-controller'
import { RouteController } from './route-controller'
import { ScrollController } from './scroll-controller'

let controllerHeroBanner: HeroBannerController
let controllerRoute: RouteController
let controllerScroll: ScrollController

export function heroBannerController() {
  if (controllerHeroBanner) return controllerHeroBanner

  return (controllerHeroBanner = HeroBannerController.create(defaultHeroBannerProps))
}

export function routeController() {
  if (controllerRoute) return controllerRoute

  return (controllerRoute = RouteController.create(defaultRouteProps))
}

export function scrollController() {
  if (controllerScroll) return controllerScroll

  return (controllerScroll = ScrollController.create(defaultScrollProps))
}
