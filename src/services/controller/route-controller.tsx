import type { TRouteIsReadyProps, TRouteParams, TRoutePathname, TRouteProps } from '@/services/controller/route'

import _ from 'lodash'

import { useRoute } from '_STR/useRoute'

export class RouteController {
  private readonly routeActions = useRoute.getState().actions

  constructor(private readonly props: TRouteProps) {
    this.setRoute = this.setRoute.bind(this)
  }

  public setRoute(pathname: TRoutePathname) {
    const route = this.getRoute(pathname)

    this.routeActions.setCurrent(pathname)
    this.routeActions.setParams(route.params)
  }

  public getRoute(pathname: string) {
    for (const route of this.props.paths) {
      const paramNames: string[] = []
      const regexPath = route.pathname
        .replace(/:([^/]+)/g, (_, paramName) => {
          paramNames.push(paramName)
          return '([^/]+)'
        })
        .replace(/\//g, '\\/')

      const regex = new RegExp(`^${regexPath}$`)
      const match = pathname.match(regex)
      if (match) {
        const params = paramNames.reduce<TRouteParams>((acc, name, idx) => {
          acc[name] = match[idx + 1]
          return acc
        }, {})
        return {
          ...route,
          params,
        }
      }
    }

    throw new Error(`Route not found: ${pathname}`)
  }

  public isReady(...[isReady]: TRouteIsReadyProps) {
    this.routeActions.setPageReady(isReady)
  }

  public get params() {
    return useRoute.getState().data.params
  }

  public get currentRoute() {
    const current = useRoute.getState().data.current
    if (!current) throw new Error('No current route set')

    return this.getRoute(current)
  }

  public get routesObject() {
    return this.props.paths.map((route) => ({
      path: route.pathname,
      component: route.element,
    }))
  }
}
