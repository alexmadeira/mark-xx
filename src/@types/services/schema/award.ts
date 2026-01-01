import { ZPrismicDocumentAward } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaAward = ZPrismicDocumentAward

export const ZSchemaAward = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
  description: z.string(),
})

//
//
//
//

export type TRawSchemaAward = z.infer<typeof ZRawSchemaAward>
export type TSchemaAward = z.infer<typeof ZSchemaAward>
