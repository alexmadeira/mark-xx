import { ZPrismicDocumentTechnology } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

import { ZSchemaUIImageSRC } from './image'

export const ZRawSchemaTechnology = ZPrismicDocumentTechnology

export const ZSchemaTechnology = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().nullish(),
  color: z.string().nullish(),
  banner: ZSchemaUIImageSRC.optional(),
})

//
//
//
//

export type TRawSchemaTechnology = z.infer<typeof ZRawSchemaTechnology>
export type TSchemaTechnology = z.infer<typeof ZSchemaTechnology>
