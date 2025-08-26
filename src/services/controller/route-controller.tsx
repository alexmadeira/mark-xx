import type { TRouteProps } from '@/services/controller/route'

import _ from 'lodash'

import { useRoute } from '_STR/useRoute'

export class RouteController {
  private readonly routeActions = useRoute.getState().actions

  protected constructor(private readonly _props: TRouteProps) {
    this.setRoute = this.setRoute.bind(this)
  }

  static create(props: TRouteProps) {
    return new RouteController(props)
  }

  public setRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (route) document.documentElement.style.setProperty('background', `var(${route.color.twVar})`)
    if (!route) document.documentElement.style.setProperty('background', 'none')

    this.routeActions.setCurrent(pathname)
  }

  public getRoute(pathname: string) {
    for (const route of this.paths) {
      const regexPath = route.pathname.replace(/:[^/]+/g, '([^/]+)').replace(/\//g, '\\/')

      const regex = new RegExp(`^${regexPath}$`)
      if (regex.test(pathname)) return route
    }
    throw new Error(`Route not found: ${pathname}`)
  }

  public get pages() {
    return this._props.pages
  }

  public get paths() {
    return this._props.paths
  }

  public get currentRoute() {
    const current = useRoute.getState().data.current
    if (!current) throw new Error('No current route set')

    return this.getRoute(current)
  }

  public get routesObject() {
    return this.paths.map((route) => ({
      path: route.pathname,
      component: this.pages[route.type],
    }))
  }
}
