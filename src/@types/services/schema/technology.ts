import { z } from 'zod/v4'

export const ZSchemaTechnology = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  banner: z.string(),
  type: z.string(),
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

//
//
//
//

export type TSchemaTechnology = z.infer<typeof ZSchemaTechnology>
