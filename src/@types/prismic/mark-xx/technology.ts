import type { TechnologyDocument, TechnologyDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentTechnology = z.custom<TechnologyDocument>()
export const ZPrismicDocumentTechnologyData = z.custom<TechnologyDocumentData>()

//
//
//
//

export type TPrismicDocumentTechnology = z.infer<typeof ZPrismicDocumentTechnology>
export type TPrismicDocumentTechnologyData = z.infer<typeof ZPrismicDocumentTechnologyData>
