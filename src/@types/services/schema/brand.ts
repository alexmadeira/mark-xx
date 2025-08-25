import { z } from 'zod/v4'

export const ZSchemaBrand = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.url(),
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

//
//
//
//

export type TSchemaBrand = z.infer<typeof ZSchemaBrand>
