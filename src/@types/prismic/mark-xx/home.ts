import type { HomeDocument, HomeDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentHome = z.custom<HomeDocument>()
export const ZPrismicDocumentHomeData = z.custom<HomeDocumentData>()

//
//
//
//

export type TPrismicDocumentHome = z.infer<typeof ZPrismicDocumentHome>
export type TPrismicDocumentHomeData = z.infer<typeof ZPrismicDocumentHomeData>
