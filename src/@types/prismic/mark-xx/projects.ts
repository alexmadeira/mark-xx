import type { ProjectsDocument, ProjectsDocumentData } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentProjects = z.custom<ProjectsDocument>()
export const ZPrismicDocumentProjectsData = z.custom<ProjectsDocumentData>()

//
//
//
//

export type TPrismicDocumentProjects = z.infer<typeof ZPrismicDocumentProjects>
export type TPrismicDocumentProjectsData = z.infer<typeof ZPrismicDocumentProjectsData>
