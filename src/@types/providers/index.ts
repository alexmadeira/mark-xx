import type { ReactNode } from 'react'

import { z } from 'zod/v4'

import { ZHelmetProps } from './helmet'
import { ZQueryClientProps } from './query-client'

export const ZProviderProps = z.object({
  children: z.custom<ReactNode>(),
  queryClientProps: ZQueryClientProps.optional(),
  helmetProps: ZHelmetProps.optional(),
})
//
//
//
//

export type TProviderProps = z.infer<typeof ZProviderProps>
