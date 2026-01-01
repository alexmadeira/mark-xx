import type { AbortSignalLike, Client, PrismicDocument, PrismicError } from '@prismicio/client'

import { ZEPrismicReturnType } from '@/enums/prismic'

import { z } from 'zod/v4'

export const ZApiPrismicInstance = z.custom<Client>()

export const ZApiPrismicRequestKey = z.string()

export const ZApiPrismicRequestError = z.custom<PrismicError<unknown>>()
export const ZApiPrismicRequestConfig = z.object({
  uid: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fields: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.coerce.date(), z.string().array()]))
    .optional(),
  return: ZEPrismicReturnType.optional(),
  signal: z.custom<AbortSignalLike>().optional(),
})

export const ZApiPrismicRequestErrorProps = z.tuple([ZApiPrismicRequestKey])
export const ZApiPrismicRequestStartedProps = z.tuple([ZApiPrismicRequestKey])
export const ZApiPrismicRequestFinishedProps = z.tuple([ZApiPrismicRequestKey])
export const ZApiPrismicRequestReturnByTypeProps = z.tuple([
  z.custom<PrismicDocument[]>(),
  ZEPrismicReturnType.optional(),
])

export const ZApiPrismicRequestGetProps = z.tuple([z.string(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestDeleteProps = z.tuple([z.string(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestPutProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestPostProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestPatchProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])

export const ZApiPrismicProps = z.object({})

//
//
//

export type TApiPrismicInstance = z.infer<typeof ZApiPrismicInstance>
export type TApiPrismicRequestError = z.infer<typeof ZApiPrismicRequestError>
export type TApiPrismicRequestConfig = z.infer<typeof ZApiPrismicRequestConfig>

export type TApiPrismicRequestErrorProps = z.infer<typeof ZApiPrismicRequestErrorProps>
export type TApiPrismicRequestStartedProps = z.infer<typeof ZApiPrismicRequestStartedProps>
export type TApiPrismicRequestFinishedProps = z.infer<typeof ZApiPrismicRequestFinishedProps>
export type TApiPrismicRequestReturnByTypeProps = z.infer<typeof ZApiPrismicRequestReturnByTypeProps>

export type TApiPrismicRequestGetProps = z.infer<typeof ZApiPrismicRequestGetProps>
export type TApiPrismicRequestDeleteProps = z.infer<typeof ZApiPrismicRequestDeleteProps>
export type TApiPrismicRequestPutProps = z.infer<typeof ZApiPrismicRequestPutProps>
export type TApiPrismicRequestPostProps = z.infer<typeof ZApiPrismicRequestPostProps>
export type TApiPrismicRequestPatchProps = z.infer<typeof ZApiPrismicRequestPatchProps>

export type TApiPrismicProps = z.infer<typeof ZApiPrismicProps>
