import type { IApi } from '@/interfaces/api'
import type { FetchQueryOptions, QueryClient } from '@tanstack/react-query'

import { ZEPrismicReturnType } from '@/enums/prismic'
import { ZERequesterMethod } from '@/enums/requester'

import { z } from 'zod/v4'

export const ZRequesterQueryClient = z.custom<QueryClient>()
export const ZRequesterQueryOption = z.custom<Omit<FetchQueryOptions, 'queryKey' | 'queryFn'>>()

export const ZRequesterBaseData = z.object({
  method: ZERequesterMethod,
  schema: z.custom<z.ZodType>(),
})

export const ZRequesterFetchData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
})

export const ZRequesterMutateData = z.object({
  method: ZERequesterMethod,
  path: z.string(),
  schema: z.custom<z.ZodType>(),
  params: z.custom<z.ZodObject>().optional(),
})

export const ZRequesterPrismicQueryParams = z.object({
  type: z.string(),
  return: ZEPrismicReturnType,
  uid: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export const ZRequesterPrismicQueryData = ZRequesterBaseData.extend({
  path: z.never().optional(),
  params: z.never().optional(),
}).strict()

export const ZRequesterHttpQueryData = ZRequesterBaseData.extend({
  path: z.string(),
  params: z.custom<z.ZodObject>().optional(),
  type: z.never().optional(),
}).strict()

export const ZRequesterQueryData = z.union([ZRequesterPrismicQueryData, ZRequesterHttpQueryData])

export const ZRequesterData = ZRequesterQueryData

export const ZRequesterBody = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
export const ZRequesterParams = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))

export const ZRequesterPaths = z.record(z.string(), ZRequesterData)

export function ZRequesterPathPath<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.custom<T[K]['path']>()
}
export function ZRequesterPathMethod<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.custom<T[K]['method']>()
}
export function ZRequesterPathSchema<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.custom<T[K]['schema']>()
}
export function ZRequesterPathParams<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.custom<T[K]['params']>()
}

export const ZRequesterQueryPrismicProps = z.union([
  z.tuple([z.union([z.string(), z.array(z.string())])]),
  z.tuple([z.union([z.string(), z.array(z.string())]), ZRequesterPrismicQueryParams.optional()]),
])

export function ZRequesterQueryDataToFetchProps<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.tuple([
    z.custom<T[K]>(),
    ZRequesterPrismicQueryParams.optional().or(z.custom<z.infer<T[K]['params']>>().optional()),
    z.custom<AbortSignal>().optional(),
    ZRequesterBody.optional(),
  ])
}

export function ZRequesterFetchProps<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.object({
    request: z.string(),
    schema: z.custom<T[K]['schema']>(),
    method: z.custom<T[K]['method']>(),
    body: ZRequesterBody.optional(),
    config: z.object({
      uid: z.string().optional(),
      tags: z.array(z.string()).optional(),
      return: ZEPrismicReturnType.optional(),
      signal: z.custom<AbortSignal>().optional(),
      params: z.custom<z.infer<T[K]['params']>>().optional(),
    }),
  })
}

export function ZRequesterQueryHttpProps<T extends z.infer<typeof ZRequesterPaths>, K extends keyof T>() {
  return z.union([
    z.tuple([z.union([z.string(), z.array(z.string())])]),
    z.tuple([z.union([z.string(), z.array(z.string())]), z.custom<z.infer<T[K]['params']>>()]),
  ])
}

export const ZRequesterMutateProps = z.tuple([ZRequesterBody.optional(), ZRequesterParams.optional()])

export function ZRequesterProps<TPaths extends z.infer<typeof ZRequesterPaths>>() {
  return z.object({
    api: z.custom<IApi>(),
    paths: z.custom<TPaths>(),
    queryClient: ZRequesterQueryClient,
  })
}

//
//
//
//

export type TRequesterQueryClient = z.infer<typeof ZRequesterQueryClient>
export type TRequesterQueryOption = z.infer<typeof ZRequesterQueryOption>
export type TRequesterBaseData = z.infer<typeof ZRequesterBaseData>
export type TRequesterFetchData = z.infer<typeof ZRequesterFetchData>
export type TRequesterMutateData = z.infer<typeof ZRequesterMutateData>
export type TRequesterPrismicQueryParams = z.infer<typeof ZRequesterPrismicQueryParams>
export type TRequesterPrismicQueryData = z.infer<typeof ZRequesterPrismicQueryData>
export type TRequesterHttpQueryData = z.infer<typeof ZRequesterHttpQueryData>
export type TRequesterQueryData = z.infer<typeof ZRequesterQueryData>
export type TRequesterData = z.infer<typeof ZRequesterData>
export type TRequesterBody = z.infer<typeof ZRequesterBody>
export type TRequesterParams = z.infer<typeof ZRequesterParams>
export type TRequesterPaths = z.infer<typeof ZRequesterPaths>

export type TRequesterQueryPrismicProps = z.infer<typeof ZRequesterQueryPrismicProps>
export type TRequesterMutateProps = z.infer<typeof ZRequesterMutateProps>

export type TRequesterPathPath<T extends TRequesterPaths, K extends keyof T> = z.infer<
  z.inferGeneric<typeof ZRequesterPathPath<T, K>>
>
export type TRequesterPathMethod<T extends TRequesterPaths, K extends keyof T> = z.infer<
  z.inferGeneric<typeof ZRequesterPathMethod<T, K>>
>
export type TRequesterPathSchema<T extends TRequesterPaths, K extends keyof T> = z.infer<
  z.inferGeneric<typeof ZRequesterPathSchema<T, K>>
>

export type TRequesterPathParams<T extends TRequesterPaths, K extends keyof T> = z.infer<
  z.inferGeneric<typeof ZRequesterPathParams<T, K>>
>
export type TRequesterQueryDataToFetchProps<T extends TRequesterPaths, K extends keyof T> = z.inferGeneric<
  typeof ZRequesterQueryDataToFetchProps<T, K>
>
export type TRequesterFetchProps<T extends TRequesterPaths, K extends keyof T> = z.inferGeneric<
  typeof ZRequesterFetchProps<T, K>
>
export type TRequesterQueryHttpProps<T extends TRequesterPaths, K extends keyof T> = z.inferGeneric<
  typeof ZRequesterQueryHttpProps<T, K>
>

export type TRequesterProps<T extends TRequesterPaths> = z.inferGeneric<typeof ZRequesterProps<T>>

export type TRequesterInferQueryDataType<T extends TRequesterPaths, K extends keyof T> = T[K] extends { path: string }
  ? TRequesterHttpQueryData
  : T[K] extends { type: string }
    ? TRequesterPrismicQueryData
    : unknown

export type TRequesterQueryProps<T extends TRequesterPaths, K extends keyof T> = T[K] extends { path: string }
  ? TRequesterQueryHttpProps<T, K>
  : TRequesterQueryPrismicProps
