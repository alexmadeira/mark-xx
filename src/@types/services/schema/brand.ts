import { ZPrismicDocumentBrand } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaBrand = ZPrismicDocumentBrand
export const ZSchemaBrand = z.object({
  id: z.string(),
  logo: z.url(),
  name: z.string(),
  slug: z.string(),
})

//
//
//
//

export type TRawSchemaBrand = z.infer<typeof ZRawSchemaBrand>
export type TSchemaBrand = z.infer<typeof ZSchemaBrand>
