import { ZPrismicDocumentTechnology } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaTechnology = ZPrismicDocumentTechnology

export const ZSchemaTechnology = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.string(),
  banner: z.string().optional(),
})

//
//
//
//

export type TRawSchemaTechnology = z.infer<typeof ZRawSchemaTechnology>
export type TSchemaTechnology = z.infer<typeof ZSchemaTechnology>
