import type { HomeDocument, HomeDocumentData, HomeDocumentDataBodySlice } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentHome = z.custom<HomeDocument>()
export const ZPrismicDocumentHomeData = z.custom<HomeDocumentData>()
export const ZPrismicDocumentHomeConfig = z.custom<HomeDocumentDataBodySlice>()

//
//
//
//

export type TPrismicDocumentHome = z.infer<typeof ZPrismicDocumentHome>
export type TPrismicDocumentHomeData = z.infer<typeof ZPrismicDocumentHomeData>
export type TPrismicDocumentHomeConfig = z.infer<typeof ZPrismicDocumentHomeConfig>
