import type { ReactNode } from 'react'
import type { HelmetProps } from 'react-helmet-async'

import { z } from 'zod/v4'

export const ZHelmetProviderProps = z.intersection(
  z.custom<HelmetProps>(),
  z.object({
    children: z.custom<ReactNode>(),
  }),
)
//
//
//
//

export type THelmetProviderProps = z.infer<typeof ZHelmetProviderProps>
