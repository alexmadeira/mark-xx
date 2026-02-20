import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZNetworksFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZNetworksFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZNetworksFetcherProps = z.object({
  filter: ZNetworksFetcherFilter.optional(),
  callback: ZNetworksFetcherCallback.optional(),
})

//
//
//

export type TNetworksFetcherCallback = z.infer<typeof ZNetworksFetcherCallback>
export type TNetworksFetcherFilter = z.infer<typeof ZNetworksFetcherFilter>
export type TNetworksFetcherProps = z.infer<typeof ZNetworksFetcherProps>
