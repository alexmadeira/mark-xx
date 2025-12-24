import { z } from 'zod/v4'

export const ZSchemaPageContent = z.string()
export const ZSchemaPageProperties = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  subTitle: z.string(),
  custom: z.record(z.string(), z.unknown()),
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

export const ZSchemaPage = z.object({
  content: ZSchemaPageContent,
  properties: ZSchemaPageProperties,
})

//
//
//
//

export type TSchemaPageContent = z.infer<typeof ZSchemaPageContent>
export type TSchemaPageProperties = z.infer<typeof ZSchemaPageProperties>

export type TSchemaPage = z.infer<typeof ZSchemaPage>
