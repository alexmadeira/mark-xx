import type { ProjectDocument, ProjectDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentProject = z.custom<ProjectDocument>()
export const ZPrismicDocumentProjectData = z.custom<ProjectDocumentData>()

//
//
//
//

export type TPrismicDocumentProject = z.infer<typeof ZPrismicDocumentProject>
export type TPrismicDocumentProjectData = z.infer<typeof ZPrismicDocumentProjectData>
