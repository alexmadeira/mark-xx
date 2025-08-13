import { ZEPageBlockMediaType, ZEPageBlockTextType } from '@/enums/page'

import { z } from 'zod/v4'

export const ZSchemaPageBlockText = z.object({
  type: ZEPageBlockTextType,
  text: z.string(),
})
export const ZSchemaPageBlockMedia = z.object({
  type: ZEPageBlockMediaType,
  src: z.url(),
  caption: z.string(),
})
export const ZSchemaPageBlock = z.discriminatedUnion('type', [ZSchemaPageBlockText, ZSchemaPageBlockMedia])

export const ZSchemaPageProperties = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

export const ZSchemaPage = z.object({
  content: z.array(ZSchemaPageBlock),
  properties: ZSchemaPageProperties,
})

//
//
//
//

export type TSchemaPageBlockText = z.infer<typeof ZSchemaPageBlockText>
export type TSchemaPageBlockMedia = z.infer<typeof ZSchemaPageBlockMedia>
export type TSchemaPageBlock = z.infer<typeof ZSchemaPageBlock>
export type TSchemaPageProperties = z.infer<typeof ZSchemaPageProperties>

export type TSchemaPage = z.infer<typeof ZSchemaPage>
