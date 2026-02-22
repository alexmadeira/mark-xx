import { z } from 'zod/v4'

export const ZSchemaUIImageSRC = z.object({
  blur: z.url().nullish(),
  original: z.url().nullish(),
})

//
//
//
//

export type TSchemaUIImageSRC = z.infer<typeof ZSchemaUIImageSRC>
