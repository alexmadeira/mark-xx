import type { ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZPreFetcherProviderProps = z.object({
  children: z.custom<ReactNode>(),
})

//
//
//
//

export type TPreFetcherProviderProps = z.infer<typeof ZPreFetcherProviderProps>
