import { ZPrismicDocumentNetwork } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZRawSchemaNetwork = ZPrismicDocumentNetwork

export const ZSchemaNetwork = z.object({
  id: z.string(),
  tags: z.string().array(),
  name: z.string(),
  path: z.string(),
  type: z.string(),
  icon: z.string(),
})

//
//
//
//

export type TRawSchemaNetwork = z.infer<typeof ZRawSchemaNetwork>
export type TSchemaNetwork = z.infer<typeof ZSchemaNetwork>
