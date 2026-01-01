import { ZEPrismicReturnType } from '@/enums/prismic'
import {
  ZPrismicDocument,
  ZPrismicDocumentFields,
  ZPrismicDocumentId,
  ZPrismicDocumentIds,
  ZPrismicDocuments,
  ZPrismicDocumentSlug,
  ZPrismicDocumentTags,
  ZPrismicError,
  ZPrismicInstance,
  ZPrismicSignal,
} from '@/prismic'

import { z } from 'zod/v4'

export const ZApiPrismicInstance = ZPrismicInstance
export const ZApiPrismicRequestError = ZPrismicError

export const ZApiPrismicRequestKey = z.string()

export const ZApiPrismicRequestBasicConfig = z.object({
  signal: ZPrismicSignal.optional(),
  return: ZEPrismicReturnType.optional(),
})
export const ZApiPrismicRequestConfig = z.object({
  ...ZApiPrismicRequestBasicConfig.shape,
  uid: ZPrismicDocumentSlug.optional(),
  tags: ZPrismicDocumentTags.optional(),
  fields: ZPrismicDocumentFields.optional(),
})

export const ZApiPrismicRequestErrorProps = z.tuple([ZApiPrismicRequestKey])
export const ZApiPrismicRequestStartedProps = z.tuple([ZApiPrismicRequestKey])
export const ZApiPrismicRequestFinishedProps = z.tuple([ZApiPrismicRequestKey])

export const ZApiPrismicRequestInjectRelationshipsProps = z.tuple([
  z.union([ZPrismicDocument, ZPrismicDocuments]).optional(),
])

export const ZApiPrismicRequestGetByIdProps = z.tuple([
  z.union([ZPrismicDocumentId, ZPrismicDocumentIds]),
  ZApiPrismicRequestBasicConfig.optional(),
])

export const ZApiPrismicRequestGetProps = z.tuple([z.string(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestDeleteProps = z.tuple([z.string(), ZApiPrismicRequestConfig.optional()])

export const ZApiPrismicRequestPutProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestPostProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])
export const ZApiPrismicRequestPatchProps = z.tuple([z.string(), z.unknown(), ZApiPrismicRequestConfig.optional()])

export const ZApiPrismicProps = z.object({})

export const ZApiPrismicRequestReturnTypeProps = z.tuple([ZPrismicDocuments, ZEPrismicReturnType.optional()])

//
//
//

export type TApiPrismicInstance = z.infer<typeof ZApiPrismicInstance>
export type TApiPrismicRequestError = z.infer<typeof ZApiPrismicRequestError>
export type TApiPrismicRequestConfig = z.infer<typeof ZApiPrismicRequestConfig>

export type TApiPrismicRequestErrorProps = z.infer<typeof ZApiPrismicRequestErrorProps>
export type TApiPrismicRequestStartedProps = z.infer<typeof ZApiPrismicRequestStartedProps>
export type TApiPrismicRequestFinishedProps = z.infer<typeof ZApiPrismicRequestFinishedProps>

export type TApiPrismicRequestInjectRelationshipsProps = z.infer<typeof ZApiPrismicRequestInjectRelationshipsProps>

export type TApiPrismicRequestGetByIdProps = z.infer<typeof ZApiPrismicRequestGetByIdProps>

export type TApiPrismicRequestGetProps = z.infer<typeof ZApiPrismicRequestGetProps>
export type TApiPrismicRequestDeleteProps = z.infer<typeof ZApiPrismicRequestDeleteProps>

export type TApiPrismicRequestPutProps = z.infer<typeof ZApiPrismicRequestPutProps>
export type TApiPrismicRequestPostProps = z.infer<typeof ZApiPrismicRequestPostProps>
export type TApiPrismicRequestPatchProps = z.infer<typeof ZApiPrismicRequestPatchProps>

export type TApiPrismicProps = z.infer<typeof ZApiPrismicProps>

export type TApiPrismicRequestReturnTypeProps = z.infer<typeof ZApiPrismicRequestReturnTypeProps>
