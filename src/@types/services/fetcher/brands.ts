import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZBrandsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZBrandsFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZBrandsFetcherProps = z.object({
  filter: ZBrandsFetcherFilter.optional(),
  callback: ZBrandsFetcherCallback.optional(),
})

//
//
//

export type TBrandsFetcherCallback = z.infer<typeof ZBrandsFetcherCallback>
export type TBrandsFetcherFilter = z.infer<typeof ZBrandsFetcherFilter>
export type TBrandsFetcherProps = z.infer<typeof ZBrandsFetcherProps>
