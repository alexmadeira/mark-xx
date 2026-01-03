import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaPageConfig } from '@/services/schema/page'

import { z } from 'zod/v4'

export const ZStorePageConfig = ZSchemaPageConfig

export const ZStorePageConfigsData = z.object({
  list: z.record(z.string(), ZStorePageConfig),
  status: ZEFetcherStatus,
})
export const ZStorePageConfigsActions = z.object({
  setPageConfig: z.custom<(config: z.infer<typeof ZStorePageConfig>) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStorePageConfigs = z.object({
  data: ZStorePageConfigsData,
  actions: ZStorePageConfigsActions,
})

//
//
//
//

export type TStorePageConfig = z.infer<typeof ZStorePageConfig>
export type TStorePageConfigsData = z.infer<typeof ZStorePageConfigsData>
export type TStorePageConfigsActions = z.infer<typeof ZStorePageConfigsActions>
export type TStorePageConfigs = z.infer<typeof ZStorePageConfigs>
