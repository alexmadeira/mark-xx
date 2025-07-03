import { defaultElementProps } from './_defaults/element'
import {
  defaultHeroColorProps,
  defaultHeroProps,
  defaultLogoColorProps,
  defaultNavigationColorProps,
  defaultRouteProps,
  defaultScrollingProps,
  defaultTextColorProps,
} from './_defaults'
import { ColorController } from './color-controller'
import { ElementController } from './element-controller'
import { HeroController } from './hero-controller'
import { OverlapController } from './overlap-controller'
import { RouteController } from './route-controller'
import { ScrollingController } from './scrolling-controller'

let controllerHero: HeroController
let controllerRoute: RouteController
let controllerScrolling: ScrollingController
let controllerOverlap: OverlapController

const controllersColor: Record<string, ColorController> = {}
const controllersElement: Record<string, ElementController> = {}

export function heroController() {
  if (controllerHero) return controllerHero

  controllerHero = HeroController.create(defaultHeroProps)

  return controllerHero
}

export function routeController() {
  if (controllerRoute) return controllerRoute

  controllerRoute = RouteController.create(defaultRouteProps)
  return controllerRoute
}

export function scrollingController() {
  if (controllerScrolling) return controllerScrolling

  controllerScrolling = ScrollingController.create(defaultScrollingProps)
  return controllerScrolling
}

export function overlapController() {
  if (controllerOverlap) return controllerOverlap

  controllerOverlap = OverlapController.create({ scrolling: scrollingController() })
  return controllerOverlap
}

export function elementController(element: keyof typeof defaultElementProps) {
  if (!controllersElement[element]) {
    controllersElement[element] = ElementController.create(defaultElementProps[element])
  }
  return controllersElement[element]
}

export function logoColorController() {
  if (!controllersColor.logo) {
    controllersColor.logo = ColorController.create(defaultLogoColorProps)
  }
  return controllersColor.logo
}

export function heroColorController() {
  if (!controllersColor.hero) {
    controllersColor.hero = ColorController.create(defaultHeroColorProps)
  }
  return controllersColor.hero
}

export function navigationColorController() {
  if (!controllersColor.navigation) {
    controllersColor.navigation = ColorController.create(defaultNavigationColorProps)
  }
  return controllersColor.navigation
}

export function textColorController() {
  if (!controllersColor.text) {
    controllersColor.text = ColorController.create(defaultTextColorProps)
  }
  return controllersColor.text
}
