import type { BrandDocument, BrandDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentBrand = z.custom<BrandDocument>()
export const ZPrismicDocumentBrandData = z.custom<BrandDocumentData>()

//
//
//
//

export type TPrismicDocumentBrand = z.infer<typeof ZPrismicDocumentBrand>
export type TPrismicDocumentBrandData = z.infer<typeof ZPrismicDocumentBrandData>
