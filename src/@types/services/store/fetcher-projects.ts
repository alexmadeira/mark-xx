import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZStoreFetcherProjectList = z.array(ZSchemaProject)
export const ZStoreFetcherProjectsData = z.object({
  list: z.record(z.string(), ZStoreFetcherProjectList),
})
export const ZStoreFetcherProjectsActions = z.object({
  setList: z.custom<(name: string, projects: z.infer<typeof ZStoreFetcherProjectList>) => void>(),
})
export const ZStoreFetcherProjects = z.object({
  data: ZStoreFetcherProjectsData,
  actions: ZStoreFetcherProjectsActions,
})

//
//
//
//

export type TStoreFetcherProjectList = z.infer<typeof ZStoreFetcherProjectList>
export type TStoreFetcherProjectsData = z.infer<typeof ZStoreFetcherProjectsData>
export type TStoreFetcherProjectsActions = z.infer<typeof ZStoreFetcherProjectsActions>
export type TStoreFetcherProjects = z.infer<typeof ZStoreFetcherProjects>
