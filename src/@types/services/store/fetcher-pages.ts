import { ZEPageStatus } from '@/enums/page'
import { ZSchemaPage } from '@/services/schema/page'

import { z } from 'zod/v4'

export const ZStoreFetcherPagesPageContant = ZSchemaPage
export const ZStoreFetcherPagesPageMeta = z.object({
  status: ZEPageStatus,
})
export const ZStoreFetcherPagesPage = z.intersection(ZStoreFetcherPagesPageContant, ZStoreFetcherPagesPageMeta)

export const ZStoreFetcherPagesData = z.record(z.string(), ZStoreFetcherPagesPage)
export const ZStoreFetcherPagesActions = z.object({
  createPage: z.custom<(name: string) => void>(),
  setPageStatus: z.custom<(name: string, status: z.infer<typeof ZEPageStatus>) => void>(),
  setPage: z.custom<(name: string, content: z.infer<typeof ZStoreFetcherPagesPageContant>) => void>(),
})
export const ZStoreFetcherPages = z.object({
  data: ZStoreFetcherPagesData,
  actions: ZStoreFetcherPagesActions,
})

//
//
//
//

export type TStoreFetcherPagesPageContant = z.infer<typeof ZStoreFetcherPagesPageContant>
export type TStoreFetcherPagesPageMeta = z.infer<typeof ZStoreFetcherPagesPageMeta>
export type TStoreFetcherPagesPage = z.infer<typeof ZStoreFetcherPagesPage>
export type TStoreFetcherPagesData = z.infer<typeof ZStoreFetcherPagesData>
export type TStoreFetcherPagesActions = z.infer<typeof ZStoreFetcherPagesActions>
export type TStoreFetcherPages = z.infer<typeof ZStoreFetcherPages>
