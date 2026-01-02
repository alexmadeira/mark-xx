import { ZPrismicAnyPageDocument } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaPage = ZPrismicAnyPageDocument

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
export type TSchemaPage = z.infer<typeof ZSchemaPage>
