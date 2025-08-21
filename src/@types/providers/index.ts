import type { ReactNode } from 'react'

import { z } from 'zod/v4'

import { ZHelmetProviderProps } from './helmet'
import { ZQueryClientProviderProps } from './query-client'

export const ZProviderProps = z.object({
  children: z.custom<ReactNode>(),
  queryClientProps: ZQueryClientProviderProps.optional(),
  helmetProps: ZHelmetProviderProps.optional(),
})
//
//
//
//

export type TProviderProps = z.infer<typeof ZProviderProps>
