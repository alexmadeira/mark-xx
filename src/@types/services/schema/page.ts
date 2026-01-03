import { ZEPageOpenGraphType, ZEPageTwitterCardType } from '@/enums/page'
import { ZPrismicAnyPageDocument, ZPrismicAnyPageDocumentConfig } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaPage = ZPrismicAnyPageDocument
export const ZRawSchemaPageConfig = ZPrismicAnyPageDocumentConfig

export const ZSchemaPageConfigSEO = z.object({
  url: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
})
export const ZSchemaPageConfigOpenGraph = z.object({
  type: ZEPageOpenGraphType,
  title: z.string().nullish(),
  image: z.string().nullish(),
  description: z.string().nullish(),
})
export const ZSchemaPageConfigTwitter = z.object({
  card: ZEPageTwitterCardType,
  image: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
})

export const ZSchemaPageMetaConfig = z.object({
  og: ZSchemaPageConfigOpenGraph,
  seo: ZSchemaPageConfigSEO,
  twitter: ZSchemaPageConfigTwitter,
})
export const ZSchemaPageConfig = z.object({
  path: z.string(),
  background: z.string(),
  meta: ZSchemaPageMetaConfig,
})

export const ZSchemaPage = z.object({
  id: z.string(),
  slug: z.string(),
  color: z.string(),
  title: z.string(),
  description: z.string(),
  subTitle: z.string().optional(),
})

//
//
//
//

export type TRawSchemaPage = z.infer<typeof ZRawSchemaPage>
export type TRawSchemaPageConfig = z.infer<typeof ZRawSchemaPageConfig>

export type TSchemaPageConfigSEO = z.infer<typeof ZSchemaPageConfigSEO>
export type TSchemaPageConfigOpenGraph = z.infer<typeof ZSchemaPageConfigOpenGraph>
export type TSchemaPageConfigTwitter = z.infer<typeof ZSchemaPageConfigTwitter>
export type TSchemaPageMetaConfig = z.infer<typeof ZSchemaPageMetaConfig>
export type TSchemaPageConfig = z.infer<typeof ZSchemaPageConfig>
export type TSchemaPage = z.infer<typeof ZSchemaPage>
