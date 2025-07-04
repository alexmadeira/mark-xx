import type { TRouteProps } from '@/services/controller/route'

import { ZDataGlobalRoute } from '@/services/content-data/global'

import _ from 'lodash'

import { useRoute } from '_STR/useRoute'

export class RouteController {
  private readonly routeActions = useRoute.getState().actions

  protected constructor(private readonly _props: TRouteProps) {
    this.setRoute = this.setRoute.bind(this)
  }

  public static create(props: TRouteProps) {
    return new RouteController(props)
  }

  public setRoute(path: string) {
    const foundedRoute = _.find(this.routes, { path })
    const route = ZDataGlobalRoute.parse(foundedRoute)

    document.documentElement.style.setProperty('background', `var(${route.color.twVar})`)
    this.routeActions.setCurrent(route.path)
  }

  public getRoute(path: string) {
    return ZDataGlobalRoute.parse(_.find(this.routes, { path }))
  }

  public getCurrent() {
    return ZDataGlobalRoute.parse(_.find(this.routes, { path: useRoute.getState().data.current }))
  }

  public get pages() {
    return this._props.pages
  }

  public get routes() {
    return this._props.routes
  }

  public get routesObject() {
    return this.routes.map((route) => ({
      path: route.path,
      component: this.pages[route.code],
    }))
  }
}
