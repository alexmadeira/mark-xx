import { ZPrismicDocumentAward } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

import { AwardType } from '_SRV/parser/award-type'

export const ZRawSchemaAward = ZPrismicDocumentAward

export const ZSchemaAward = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.instanceof(AwardType),
  date: z.coerce.date(),
  description: z.string(),
  by: z.string().nullish(),
})

//
//
//
//

export type TRawSchemaAward = z.infer<typeof ZRawSchemaAward>
export type TSchemaAward = z.infer<typeof ZSchemaAward>
