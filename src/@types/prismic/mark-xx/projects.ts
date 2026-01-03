import type { ProjectsDocument, ProjectsDocumentData, ProjectsDocumentDataBodySlice } from './types'

import { z } from 'zod/v4'

export const ZPrismicDocumentProjects = z.custom<ProjectsDocument>()
export const ZPrismicDocumentProjectsData = z.custom<ProjectsDocumentData>()
export const ZPrismicDocumentProjectsConfig = z.custom<ProjectsDocumentDataBodySlice>()

//
//
//
//

export type TPrismicDocumentProjects = z.infer<typeof ZPrismicDocumentProjects>
export type TPrismicDocumentProjectsData = z.infer<typeof ZPrismicDocumentProjectsData>
export type TPrismicDocumentProjectsConfig = z.infer<typeof ZPrismicDocumentProjectsConfig>
