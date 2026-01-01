import type { ProjectDocument, ProjectDocumentData } from './types'

import { z } from 'zod/v4'

import { ZPrismicDocumentTechnology } from './technology'

export const ZPrismicDocumentProject = z.intersection(
  z.custom<ProjectDocument>(),
  z.object({
    data: z.object({
      technologies: ZPrismicDocumentTechnology.array(),
    }),
  }),
)
export const ZPrismicDocumentProjectData = z.custom<ProjectDocumentData>()

//
//
//
//

export type TPrismicDocumentProject = z.infer<typeof ZPrismicDocumentProject>
export type TPrismicDocumentProjectData = z.infer<typeof ZPrismicDocumentProjectData>
