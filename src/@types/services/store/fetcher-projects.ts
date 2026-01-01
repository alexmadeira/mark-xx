import { ZEPageStatus } from '@/enums/page'
import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZStoreFetcherProject = z.object({
  ...ZSchemaProject.shape,
  status: ZEPageStatus,
})

export const ZStoreFetcherProjectsData = z.object({
  list: z.record(z.string(), ZStoreFetcherProject.array()),
  pages: z.record(z.string(), ZStoreFetcherProject),
})

export const ZStoreFetcherProjectsActions = z.object({
  setList: z.custom<(name: string, projects: z.infer<typeof ZStoreFetcherProject>[]) => void>(),
  setProjectPage: z.custom<(slug: string, project: z.infer<typeof ZStoreFetcherProject>) => void>(),
  setProjectPageStatus: z.custom<(slug: string, status: z.infer<typeof ZEPageStatus>) => void>(),
})
export const ZStoreFetcherProjects = z.object({
  data: ZStoreFetcherProjectsData,
  actions: ZStoreFetcherProjectsActions,
})

//
//
//
//

export type TStoreFetcherProject = z.infer<typeof ZStoreFetcherProject>
export type TStoreFetcherProjectsData = z.infer<typeof ZStoreFetcherProjectsData>
export type TStoreFetcherProjectsActions = z.infer<typeof ZStoreFetcherProjectsActions>
export type TStoreFetcherProjects = z.infer<typeof ZStoreFetcherProjects>
