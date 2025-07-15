import { defaultElementProps } from './_defaults/element'
import { defaultColorProps, defaultHeroProps, defaultRouteProps, defaultScrollingProps } from './_defaults'
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

  controllerOverlap = OverlapController.create()
  return controllerOverlap
}

export function colorController(color: keyof typeof defaultColorProps) {
  if (!controllersColor[color]) {
    controllersColor[color] = ColorController.create(defaultColorProps[color])
  }
  return controllersColor[color]
}

export function elementController(element: keyof typeof defaultElementProps) {
  if (!controllersElement[element]) {
    controllersElement[element] = ElementController.create(defaultElementProps[element])
  }
  return controllersElement[element]
}
