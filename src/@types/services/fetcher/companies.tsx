import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZCompaniesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZCompaniesFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZCompaniesFetcherProps = z.object({
  filter: ZCompaniesFetcherFilter.optional(),
  callback: ZCompaniesFetcherCallback.optional(),
})

//
//
//

export type TCompaniesFetcherCallback = z.infer<typeof ZCompaniesFetcherCallback>
export type TCompaniesFetcherFilter = z.infer<typeof ZCompaniesFetcherFilter>
export type TCompaniesFetcherProps = z.infer<typeof ZCompaniesFetcherProps>
