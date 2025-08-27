import type { ReactNode } from 'react'
import type { HelmetProps } from 'react-helmet-async'

import { z } from 'zod/v4'

export const ZHelmetProps = z.custom<HelmetProps>()
export const ZHelmetProviderProps = z.intersection(
  ZHelmetProps,
  z.object({
    children: z.custom<ReactNode>(),
  }),
)
//
//
//
//

export type THelmetProps = z.infer<typeof ZHelmetProps>
export type THelmetProviderProps = z.infer<typeof ZHelmetProviderProps>
