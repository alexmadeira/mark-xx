import { ZEPageOpenGraphType, ZEPageTwitterCardType } from '@/enums/page'
import { ZPrismicAnyPageDocument, ZPrismicAnyPageDocumentConfig } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaPage = ZPrismicAnyPageDocument
export const ZRawSchemaPageConfig = ZPrismicAnyPageDocumentConfig

export const ZSchemaPageConfigSEO = z.object({
  title: z.string(),
  description: z.string().nullish(),
})
export const ZSchemaPageConfigOpenGraph = z.object({
  type: ZEPageOpenGraphType,
  title: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
})
export const ZSchemaPageConfigTwitter = z.object({
  card: ZEPageTwitterCardType,
  title: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
})

export const ZSchemaPageMetaConfig = z.object({
  seo: ZSchemaPageConfigSEO,
  twitter: ZSchemaPageConfigTwitter,
  openGraph: ZSchemaPageConfigOpenGraph,
})
export const ZSchemaPageConfig = z.object({
  key: z.string(),
  canonical: z.url(),
  background: z.string(),
  meta: ZSchemaPageMetaConfig,
})

export const ZSchemaPage = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  quote: z.string().optional(),
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
