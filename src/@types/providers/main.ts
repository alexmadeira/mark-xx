import type { ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZMainProviderProps = z.object({
  children: z.custom<ReactNode>(),
})

//
//
//
//

export type TMainProviderProps = z.infer<typeof ZMainProviderProps>
