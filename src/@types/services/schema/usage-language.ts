import { z } from 'zod/v4'

export const ZSchemaUsageLanguage = z.object({
  name: z.string(),
  size: z.number(),
  color: z.string(),
})

//
//
//
//

export type TSchemaUsageLanguage = z.infer<typeof ZSchemaUsageLanguage>
