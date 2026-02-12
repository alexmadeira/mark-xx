import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZAwardsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZAwardsFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZAwardsFetcherProps = z.object({
  filter: ZAwardsFetcherFilter.optional(),
  callback: ZAwardsFetcherCallback.optional(),
})

//
//
//

export type TAwardsFetcherCallback = z.infer<typeof ZAwardsFetcherCallback>
export type TAwardsFetcherFilter = z.infer<typeof ZAwardsFetcherFilter>
export type TAwardsFetcherProps = z.infer<typeof ZAwardsFetcherProps>
