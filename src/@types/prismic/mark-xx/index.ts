import type { AllDocumentTypes } from './types'

import { z } from 'zod/v4'

import { ZPrismicDocumentAbout, ZPrismicDocumentAboutConfig } from './about'
import { ZPrismicDocumentHome, ZPrismicDocumentHomeConfig } from './home'
import { ZPrismicDocumentProjectConfig } from './project'
import { ZPrismicDocumentProjects, ZPrismicDocumentProjectsConfig } from './projects'

export * from './home'
export * from './brand'
export * from './about'
export * from './award'
export * from './project'
export * from './company'
export * from './projects'
export * from './technology'

export const ZPrismicAnyDocument = z.custom<AllDocumentTypes>()

export const ZPrismicAnyPageDocument = z.union([ZPrismicDocumentHome, ZPrismicDocumentAbout, ZPrismicDocumentProjects])
export const ZPrismicAnyPageDocumentConfig = z.union([
  ZPrismicDocumentHomeConfig,
  ZPrismicDocumentAboutConfig,
  ZPrismicDocumentProjectConfig,
  ZPrismicDocumentProjectsConfig,
])

//
//
//
//

export type TPrismicAnyDocument = z.infer<typeof ZPrismicAnyDocument>
export type TPrismicAnyPageDocument = z.infer<typeof ZPrismicAnyPageDocument>
export type TPrismicAnyPageDocumentConfig = z.infer<typeof ZPrismicAnyPageDocumentConfig>
