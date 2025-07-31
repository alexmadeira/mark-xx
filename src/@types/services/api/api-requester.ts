import type { QueryClient } from '@tanstack/react-query'
import type { AxiosInstance } from 'axios'

import { z } from 'zod/v4'

export const ZApiRequesterInstance = z.custom<AxiosInstance>()

export const ZApiRequesterFetchProps = z.object({
  path: z.string(),
  body: z.record(z.string(), z.string()).optional(),
  params: z.record(z.string(), z.string()).optional(),
  signal: z.custom<AbortSignal>().optional(),
})

export const ZApiRequesterMutateProps = z.tuple([
  z.string(),
  z.record(z.string(), z.string()).optional(),
  z.record(z.string(), z.string()).optional(),
])

export const ZApiRequesterQueryProps = z.tuple([
  z.string(),
  z.string(),
  z.record(z.string(), z.string()).optional(),
  z.record(z.string(), z.string()).optional(),
])

export const ZApiRequesterProps = z.object({
  host: z.url(),
  queryClient: z.custom<QueryClient>(),
})

//
//
//
//

export type TApiRequesterInstance = z.infer<typeof ZApiRequesterInstance>
export type TApiRequesterFetchProps = z.infer<typeof ZApiRequesterFetchProps>
export type TApiRequesterMutateProps = z.infer<typeof ZApiRequesterMutateProps>
export type TApiRequesterQueryProps = z.infer<typeof ZApiRequesterQueryProps>
export type TApiRequesterProps = z.infer<typeof ZApiRequesterProps>
