import {
  defaultColorProps,
  defaultElementProps,
  defaultHeroProps,
  defaultRouteProps,
  defaultScrollingProps,
  defaultSEOProps,
} from './_defaults'
import { ColorController } from './color-controller'
import { ElementController } from './element-controller'
import { HeroController } from './hero-controller'
import { OverlapController } from './overlap-controller'
import { RouteController } from './route-controller'
import { ScrollingController } from './scrolling-controller'
import { SEOController } from './seo-controller'

let controllerHero: HeroController
let controllerRoute: RouteController
let controllerOverlap: OverlapController
let controllerScrolling: ScrollingController
let controllerSEO: SEOController

const controllersColor: Record<string, ColorController<keyof typeof defaultColorProps>> = {}
const controllersElement: Record<string, ElementController> = {}

export function scrollingController() {
  if (!controllerScrolling) controllerScrolling = ScrollingController.create(defaultScrollingProps)
  return controllerScrolling
}

export function colorController(color: keyof typeof defaultColorProps) {
  if (!controllersColor[color])
    controllersColor[color] = ColorController.create<keyof typeof defaultColorProps>(defaultColorProps[color])
  return controllersColor[color]
}

export function elementController(element: keyof typeof defaultElementProps) {
  if (!controllersElement[element]) controllersElement[element] = ElementController.create(defaultElementProps[element])
  return controllersElement[element]
}

export function heroController() {
  if (!controllerHero) controllerHero = new HeroController(defaultHeroProps)
  return controllerHero
}

export function routeController() {
  if (!controllerRoute) controllerRoute = new RouteController(defaultRouteProps)
  return controllerRoute
}

export function overlapController() {
  if (!controllerOverlap) controllerOverlap = new OverlapController()
  return controllerOverlap
}

export function seoController() {
  if (!controllerSEO) controllerSEO = new SEOController(defaultSEOProps)
  return controllerSEO
}
