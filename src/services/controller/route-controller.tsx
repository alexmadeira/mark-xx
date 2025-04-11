import { ZDataGlobalRoute } from '@/services/content-data/global'
import { TRouteProps } from '@/services/controller/route'

import _ from 'lodash'

import { useRoute } from '_STR/useRoute'

export class RouteController {
  private readonly _actions = useRoute.getState().actions

  protected constructor(private readonly _props: TRouteProps) {
    this._actions.setRoutes(this._props.routes)
  }

  public static create(props: TRouteProps) {
    return new RouteController(props)
  }

  public setRoute(path: string) {
    const foundedRoute = _.find(useRoute.getState().data.routes, { path })
    const route = ZDataGlobalRoute.parse(foundedRoute)

    document.documentElement.style.setProperty('background', `var(${route.color.twVar})`)
    this._actions.setCurrent(route)
  }

  public get pages() {
    return this._props.pages
  }

  public get routes() {
    return this._props.routes
  }

  public get routesObject() {
    return useRoute.getState().data.routes.map((route) => ({
      path: route.path,
      component: this.pages[route.code],
    }))
  }
}
