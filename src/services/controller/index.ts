import { defaultHeroBannerProps, defaultRouteProps, defaultScrollProps } from './_defaults'
import { HeroBannerController } from './hero-banner-controller'
import { OverlapController } from './overlap-controller'
import { RouteController } from './route-controller'
import { ScrollController } from './scroll-controller'

let controllerHeroBanner: HeroBannerController
let controllerRoute: RouteController
let controllerScroll: ScrollController

const controllerOverlap: Record<string, OverlapController> = {}

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

export function overlapController(name: string) {
  if (controllerOverlap[name]) return controllerOverlap[name]

  return (controllerOverlap[name] = new OverlapController({ name, scrolling: scrollController() }))
}
