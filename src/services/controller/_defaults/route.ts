import type { TRouteProps } from '@/services/controller/route'

import { dataGlobalPages, dataGlobalRoutes } from '_SRV/content-data/global'

export const defaultRouteProps = {
  pages: dataGlobalPages,
  routes: dataGlobalRoutes,
} satisfies TRouteProps
