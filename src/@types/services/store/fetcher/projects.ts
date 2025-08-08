import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZStoreProjectList = z.array(ZSchemaProject)
export const ZStoreProjectsData = z.object({
  list: z.record(z.string(), ZStoreProjectList),
})
export const ZStoreProjectsActions = z.object({
  setList: z.custom<(name: string, projects: z.infer<typeof ZStoreProjectList>) => void>(),
})
export const ZStoreProjects = z.object({
  data: ZStoreProjectsData,
  actions: ZStoreProjectsActions,
})

//
//
//
//

export type TStoreProjectList = z.infer<typeof ZStoreProjectList>
export type TStoreProjectsData = z.infer<typeof ZStoreProjectsData>
export type TStoreProjectsActions = z.infer<typeof ZStoreProjectsActions>
export type TStoreProjects = z.infer<typeof ZStoreProjects>
