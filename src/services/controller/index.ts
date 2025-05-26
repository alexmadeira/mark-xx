import {
  defaultHeroBannerProps,
  defaultLogoColorProps,
  defaultNavigationColorProps,
  defaultRouteProps,
  defaultScrollingProps,
} from './_defaults'
import { ColorController } from './color-controller'
import { HeroBannerController } from './hero-banner-controller'
import { OverlapController } from './overlap-controller'
import { RouteController } from './route-controller'
import { ScrollingController } from './scrolling-controller'

let controllerHeroBanner: HeroBannerController
let controllerRoute: RouteController
let controllerScrolling: ScrollingController

const controllerOverlap: Record<string, OverlapController> = {}
const controllersColor: Record<string, ColorController> = {}

export function heroBannerController() {
  if (controllerHeroBanner) return controllerHeroBanner

  return (controllerHeroBanner = HeroBannerController.create(defaultHeroBannerProps))
}

export function routeController() {
  if (controllerRoute) return controllerRoute

  return (controllerRoute = RouteController.create(defaultRouteProps))
}

export function scrollingController() {
  if (controllerScrolling) return controllerScrolling

  return (controllerScrolling = ScrollingController.create(defaultScrollingProps))
}

export function overlapController(name: string) {
  if (controllerOverlap[name]) return controllerOverlap[name]

  return (controllerOverlap[name] = new OverlapController({ name, scrolling: scrollingController() }))
}

export function logoColorController() {
  if (!controllersColor.logo) {
    controllersColor.logo = ColorController.create(defaultLogoColorProps)
  }
  return controllersColor.logo
}
export function navigationColorController() {
  if (!controllersColor.navigation) {
    controllersColor.navigation = ColorController.create(defaultNavigationColorProps)
  }
  return controllersColor.navigation
}
