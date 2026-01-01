import { ZPrismicDocumentCompany } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaCompany = ZPrismicDocumentCompany

export const ZSchemaCompany = z.object({
  id: z.string(),
  end: z.coerce.date().nullish(),
  slug: z.string(),
  role: z.string(),
  name: z.string(),
  start: z.coerce.date(),
  description: z.string(),
})

//
//
//
//

export type TRawSchemaCompany = z.infer<typeof ZRawSchemaCompany>
export type TSchemaCompany = z.infer<typeof ZSchemaCompany>
