import { z } from 'zod/v4'

export const ZRawSchemaUsageLanguage = z.object({
  name: z.string(),
  size: z.number(),
  color: z.string(),
})
export const ZSchemaUsageLanguage = ZRawSchemaUsageLanguage
//
//
//
//

export type TRawSchemaUsageLanguage = z.infer<typeof ZRawSchemaUsageLanguage>
export type TSchemaUsageLanguage = z.infer<typeof ZSchemaUsageLanguage>
