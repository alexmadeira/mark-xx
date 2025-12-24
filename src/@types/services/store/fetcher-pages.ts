import { ZEPageStatus } from '@/enums/page'

import { z } from 'zod/v4'

export const ZStoreFetcherPagesPageProperties = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  movie: z.string().optional(),
  content: z.string().optional(),
  subTitle: z.string().optional(),
})
export const ZStoreFetcherPagesPageMeta = z.object({
  status: ZEPageStatus,
})
export const ZStoreFetcherPagesPage = z.intersection(ZStoreFetcherPagesPageProperties, ZStoreFetcherPagesPageMeta)

export const ZStoreFetcherPagesData = z.record(z.string(), ZStoreFetcherPagesPage)
export const ZStoreFetcherPagesActions = z.object({
  createPage: z.custom<(name: string) => void>(),
  setPageStatus: z.custom<(name: string, status: z.infer<typeof ZEPageStatus>) => void>(),
  setPage: z.custom<(name: string, content: z.infer<typeof ZStoreFetcherPagesPageProperties>) => void>(),
})
export const ZStoreFetcherPages = z.object({
  data: ZStoreFetcherPagesData,
  actions: ZStoreFetcherPagesActions,
})

//
//
//
//

export type TStoreFetcherPagesPageProperties = z.infer<typeof ZStoreFetcherPagesPageProperties>
export type TStoreFetcherPagesPageMeta = z.infer<typeof ZStoreFetcherPagesPageMeta>
export type TStoreFetcherPagesPage = z.infer<typeof ZStoreFetcherPagesPage>
export type TStoreFetcherPagesData = z.infer<typeof ZStoreFetcherPagesData>
export type TStoreFetcherPagesActions = z.infer<typeof ZStoreFetcherPagesActions>
export type TStoreFetcherPages = z.infer<typeof ZStoreFetcherPages>
