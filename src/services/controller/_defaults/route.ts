import type { TRouteProps } from '@/services/controller/route'

import { routePages } from '_CFG/route/pages'
import { routePaths } from '_CFG/route/paths'

export const defaultRouteProps = {
  pages: routePages,
  paths: routePaths,
} satisfies TRouteProps
