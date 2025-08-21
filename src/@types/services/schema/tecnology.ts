import { z } from 'zod/v4'

export const ZSchemaTecnology = z.object({
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

export type TSchemaTecnology = z.infer<typeof ZSchemaTecnology>
