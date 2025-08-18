import { z } from 'zod/v4'

export const ZSchemaAwardDate = z.object({ start: z.coerce.date() })

export const ZSchemaAward = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  date: ZSchemaAwardDate,
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

//
//
//
//

export type TSchemaAwardDate = z.infer<typeof ZSchemaAwardDate>
export type TSchemaAward = z.infer<typeof ZSchemaAward>
