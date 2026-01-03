import type { ProjectDocument, ProjectDocumentData, ProjectDocumentDataBodySlice } from './types'

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

//
//
//
//

export type TPrismicDocumentProject = z.infer<typeof ZPrismicDocumentProject>
export type TPrismicDocumentProjectData = z.infer<typeof ZPrismicDocumentProjectData>
export type TPrismicDocumentProjectConfig = z.infer<typeof ZPrismicDocumentProjectConfig>
