import type { ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZQueryClientProps = z.partialRecord(z.string(), z.unknown()).optional()
export const ZQueryClientProviderProps = z.intersection(
  ZQueryClientProps,
  z.object({
    children: z.custom<ReactNode>(),
  }),
)

//
//
//
//

export type TQueryClientProps = z.infer<typeof ZQueryClientProps>
export type TQueryClientProviderProps = z.infer<typeof ZQueryClientProviderProps>
