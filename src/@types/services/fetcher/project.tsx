import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZProjectFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZProjectFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZProjectFetcherProps = z.object({
  filter: ZProjectFetcherFilter.optional(),
  callback: ZProjectFetcherCallback.optional(),
})

//
//
//

export type TProjectFetcherCallback = z.infer<typeof ZProjectFetcherCallback>
export type TProjectFetcherFilter = z.infer<typeof ZProjectFetcherFilter>
export type TProjectFetcherProps = z.infer<typeof ZProjectFetcherProps>
