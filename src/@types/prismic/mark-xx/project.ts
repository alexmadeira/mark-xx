import type {
  ProjectDocument,
  ProjectDocumentData,
  ProjectDocumentDataBlocksBlocoFullImageSlice,
  ProjectDocumentDataBlocksBlocoImagemGridSlice,
  ProjectDocumentDataBlocksSlice,
  ProjectDocumentDataBodySlice,
} from './types'

import { z } from 'zod/v4'

import { ZPrismicDocumentCompany } from './company'
import { ZPrismicDocumentTechnology } from './technology'

export const ZPrismicDocumentProject = z.intersection(
  z.custom<ProjectDocument>(),
  z.object({
    data: z.object({
      technologies: ZPrismicDocumentTechnology.array(),
      company: ZPrismicDocumentCompany.array(),
    }),
  }),
)
export const ZPrismicDocumentProjectData = z.custom<ProjectDocumentData>()
export const ZPrismicDocumentProjectConfig = z.custom<ProjectDocumentDataBodySlice>()
export const ZPrismicDocumentProjectContentFullImage = z.custom<ProjectDocumentDataBlocksBlocoFullImageSlice>()
export const ZPrismicDocumentProjectContentImagemGrid = z.custom<ProjectDocumentDataBlocksBlocoImagemGridSlice>()
export const ZPrismicDocumentProjectContents = z.custom<ProjectDocumentDataBlocksSlice>()

//
//
//
//

export type TPrismicDocumentProject = z.infer<typeof ZPrismicDocumentProject>
export type TPrismicDocumentProjectData = z.infer<typeof ZPrismicDocumentProjectData>
export type TPrismicDocumentProjectConfig = z.infer<typeof ZPrismicDocumentProjectConfig>
export type TPrismicDocumentProjectContentFullImage = z.infer<typeof ZPrismicDocumentProjectContentFullImage>
export type TPrismicDocumentProjectContentImagemGrid = z.infer<typeof ZPrismicDocumentProjectContentImagemGrid>
export type TPrismicDocumentProjectContents = z.infer<typeof ZPrismicDocumentProjectContents>
