import { ZPrismicDocumentField, ZPrismicDocumentTag } from '@/prismic'

import { z } from 'zod/v4'

export const ZTechnologiesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZTechnologiesFetcherFilter = z.object({
  tags: ZPrismicDocumentTag.array().optional(),
  fields: z.record(z.string(), ZPrismicDocumentField).optional(),
})

export const ZTechnologiesFetcherProps = z.object({
  filter: ZTechnologiesFetcherFilter.optional(),
  callback: ZTechnologiesFetcherCallback.optional(),
})

//
//
//

export type TTechnologiesFetcherCallback = z.infer<typeof ZTechnologiesFetcherCallback>
export type TTechnologiesFetcherFilter = z.infer<typeof ZTechnologiesFetcherFilter>
export type TTechnologiesFetcherProps = z.infer<typeof ZTechnologiesFetcherProps>
