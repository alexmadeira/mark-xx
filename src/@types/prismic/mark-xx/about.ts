import type { AboutDocument, AboutDocumentData, AboutDocumentDataBodySlice } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentAbout = z.custom<AboutDocument>()
export const ZPrismicDocumentAboutData = z.custom<AboutDocumentData>()
export const ZPrismicDocumentAboutConfig = z.custom<AboutDocumentDataBodySlice>()

//
//
//
//

export type TPrismicDocumentAbout = z.infer<typeof ZPrismicDocumentAbout>
export type TPrismicDocumentAboutData = z.infer<typeof ZPrismicDocumentAboutData>
export type TPrismicDocumentAboutConfig = z.infer<typeof ZPrismicDocumentAboutConfig>
