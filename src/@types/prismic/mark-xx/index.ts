import type { AllDocumentTypes } from './types'

import { z } from 'zod/v4'

import { ZPrismicDocumentAbout } from './about'
import { ZPrismicDocumentHome } from './home'
import { ZPrismicDocumentProjects } from './projects'

export * from './home'
export * from './brand'
export * from './about'
export * from './award'
export * from './projects'
export * from './technology'

export const ZPrismicAnyDocument = z.custom<AllDocumentTypes>()

export const ZPrismicAnyPageDocument = z.union([ZPrismicDocumentHome, ZPrismicDocumentAbout, ZPrismicDocumentProjects])

//
//
//
//

export type TPrismicAnyDocument = z.infer<typeof ZPrismicAnyDocument>
export type TPrismicAnyPageDocument = z.infer<typeof ZPrismicAnyPageDocument>
