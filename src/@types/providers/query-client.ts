import type { ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZQueryClientProviderProps = z.object({
  children: z.custom<ReactNode>(),
})

//
//
//
//

export type TQueryClientProviderProps = z.infer<typeof ZQueryClientProviderProps>
