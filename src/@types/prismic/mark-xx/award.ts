import type { AwardDocument, AwardDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentAward = z.custom<AwardDocument>()
export const ZPrismicDocumentAwardData = z.custom<AwardDocumentData>()
export const ZPrismicDocumentAwardType = z.custom<AwardDocumentData['type']>()

//
//
//
//

export type TPrismicDocumentAward = z.infer<typeof ZPrismicDocumentAward>
export type TPrismicDocumentAwardType = z.infer<typeof ZPrismicDocumentAwardType>
export type TPrismicDocumentAwardData = z.infer<typeof ZPrismicDocumentAwardData>
