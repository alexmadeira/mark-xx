import type {
  AbortSignalLike,
  Client,
  ForbiddenError,
  InvalidDataError,
  NotFoundError,
  PrismicDocument,
  PrismicError,
  RepositoryNotFoundError,
} from '@prismicio/client'

import { z } from 'zod/v4'

export const ZPrismicInstance = z.custom<Client>()
export const ZPrismicSignal = z.custom<AbortSignalLike>()

export const ZPrismicDocument = z.custom<PrismicDocument>()
export const ZPrismicDocuments = ZPrismicDocument.array()
export const ZPrismicDocumentId = z.string()
export const ZPrismicDocumentIds = ZPrismicDocumentId.array()
export const ZPrismicDocumentTag = z.string()
export const ZPrismicDocumentSlug = z.string()
export const ZPrismicDocumentTags = ZPrismicDocumentTag.array()
export const ZPrismicDocumentField = z.union([z.string(), z.number(), z.boolean(), z.coerce.date(), z.string().array()])
export const ZPrismicDocumentFields = z.record(z.string(), ZPrismicDocumentField)

export const ZPrismicError = z.custom<PrismicError<unknown>>()
export const ZPrismicNotFoundError = z.custom<NotFoundError>()
export const ZPrismicForbiddenError = z.custom<ForbiddenError>()
export const ZPrismicInvalidDataError = z.custom<InvalidDataError>()
export const ZPrismicRepositoryNotFoundError = z.custom<RepositoryNotFoundError>()

//
//
//

export type TPrismicInstance = z.infer<typeof ZPrismicInstance>
export type TPrismicSignal = z.infer<typeof ZPrismicSignal>

export type TPrismicDocument = z.infer<typeof ZPrismicDocument>
export type TPrismicDocuments = z.infer<typeof ZPrismicDocuments>
export type TPrismicDocumentId = z.infer<typeof ZPrismicDocumentId>
export type TPrismicDocumentIds = z.infer<typeof ZPrismicDocumentIds>
export type TPrismicDocumentTag = z.infer<typeof ZPrismicDocumentTag>
export type TPrismicDocumentSlug = z.infer<typeof ZPrismicDocumentSlug>
export type TPrismicDocumentTags = z.infer<typeof ZPrismicDocumentTags>
export type TPrismicDocumentField = z.infer<typeof ZPrismicDocumentField>
export type TPrismicDocumentFields = z.infer<typeof ZPrismicDocumentFields>

export type TPrismicError = z.infer<typeof ZPrismicError>
export type TPrismicNotFoundError = z.infer<typeof ZPrismicNotFoundError>
export type TPrismicForbiddenError = z.infer<typeof ZPrismicForbiddenError>
export type TPrismicInvalidDataError = z.infer<typeof ZPrismicInvalidDataError>
export type TPrismicRepositoryNotFoundError = z.infer<typeof ZPrismicRepositoryNotFoundError>
