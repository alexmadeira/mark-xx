import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZProjectsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZProjectsFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZProjectsFetcherProps = z.object({
  filter: ZProjectsFetcherFilter.optional(),
  callback: ZProjectsFetcherCallback.optional(),
})

//
//
//

export type TProjectsFetcherCallback = z.infer<typeof ZProjectsFetcherCallback>
export type TProjectsFetcherFilter = z.infer<typeof ZProjectsFetcherFilter>
export type TProjectsFetcherProps = z.infer<typeof ZProjectsFetcherProps>
