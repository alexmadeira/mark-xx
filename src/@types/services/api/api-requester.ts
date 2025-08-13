import type { FetchQueryOptions, QueryClient } from '@tanstack/react-query'
import type { AxiosInstance } from 'axios'

import { ZERequesterMethod } from '@/enums/requester'

import { z } from 'zod/v4'

export const ZApiRequesterInstance = z.custom<AxiosInstance>()
export const ZApiRequesterQueryOption = z.custom<Omit<FetchQueryOptions, 'queryKey' | 'queryFn'>>()

export const ZApiRequesterBaseData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
  schema: z.custom<z.ZodType>(),
})

export const ZApiRequesterFetchData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
})
export const ZApiRequesterMutateData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
  schema: z.custom<z.ZodType>(),
})
export const ZApiRequesterQueryData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
  schema: z.custom<z.ZodType>(),
})

export const ZApiRequesterData = z.union([ZApiRequesterMutateData, ZApiRequesterQueryData])
export const ZApiRequesterBody = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
export const ZApiRequesterParams = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))

export const ZApiRequesterFetchProps = z.object({
  req: ZApiRequesterFetchData,
  body: ZApiRequesterBody.optional(),
  params: ZApiRequesterParams.optional(),
  signal: z.custom<AbortSignal>().optional(),
})

export const ZApiRequesterMutateProps = z.tuple([ZApiRequesterBody.optional(), ZApiRequesterParams.optional()])

export const ZApiRequesterQueryProps = z.tuple([
  z.union([z.string(), z.array(z.string())]),
  ZApiRequesterBody.optional(),
  ZApiRequesterParams.optional(),
])

export const ZApiRequesterHost = z.url()
export const ZApiRequesterPaths = z.record(z.string(), ZApiRequesterData)
export const ZApiRequesterQueryClient = z.custom<QueryClient>()

export const ZApiRequesterProps = z.object({
  host: ZApiRequesterHost,
  paths: ZApiRequesterPaths,
  queryClient: ZApiRequesterQueryClient,
})

//
//
//
//

export type TApiRequesterInstance = z.infer<typeof ZApiRequesterInstance>
export type TApiRequesterQueryOption = z.infer<typeof ZApiRequesterQueryOption>
export type TApiRequesterBaseData = z.infer<typeof ZApiRequesterBaseData>
export type TApiRequesterFetchData = z.infer<typeof ZApiRequesterFetchData>
export type TApiRequesterMutateData = z.infer<typeof ZApiRequesterMutateData>
export type TApiRequesterQueryData = z.infer<typeof ZApiRequesterQueryData>
export type TApiRequesterData = z.infer<typeof ZApiRequesterData>
export type TApiRequesterBody = z.infer<typeof ZApiRequesterBody>
export type TApiRequesterParams = z.infer<typeof ZApiRequesterParams>
export type TApiRequesterFetchProps = z.infer<typeof ZApiRequesterFetchProps>
export type TApiRequesterMutateProps = z.infer<typeof ZApiRequesterMutateProps>
export type TApiRequesterQueryProps = z.infer<typeof ZApiRequesterQueryProps>
export type TApiRequesterHost = z.infer<typeof ZApiRequesterHost>
export type TApiRequesterPaths = z.infer<typeof ZApiRequesterPaths>
export type TApiRequesterQueryClient = z.infer<typeof ZApiRequesterQueryClient>

export type TApiRequesterPathInferSchema<T, K extends keyof T> = T[K] extends { schema: z.ZodType }
  ? z.infer<T[K]['schema']>
  : unknown

export type TApiRequesterQueryResponse<T, K extends keyof T> = Promise<TApiRequesterPathInferSchema<T, K> | undefined>
export type TApiRequesterMutateResponse<T, K extends keyof T> = Promise<TApiRequesterPathInferSchema<T, K> | undefined>

export type TApiRequesterProps<TPaths extends TApiRequesterPaths> = {
  paths: TPaths
  host: TApiRequesterHost
  queryClient: TApiRequesterQueryClient
}
