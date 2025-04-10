import type { TStoreRouteData } from '@/services/store/route'

import { dataGlobalRoutes } from '_SRV/content-data/global'

export const routeDefaultData = {
  routes: dataGlobalRoutes,
  current: dataGlobalRoutes[0],
} satisfies TStoreRouteData
