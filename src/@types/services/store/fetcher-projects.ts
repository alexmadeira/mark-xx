import { ZEPageStatus } from '@/enums/page'
import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZStoreFetcherProjectList = z.array(ZSchemaProject)

export const ZStoreFetcherProjectsProjectMeta = z.object({
  status: ZEPageStatus,
})
export const ZStoreFetcherProjectsProjectProperties = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  role: z.string(),
  color: z.string(),
  company: z.string(),
  teamSize: z.string(),
  bannerSrc: z.url(),
  highlight: z.boolean(),
  bannerName: z.string(),
  description: z.string(),
  bannerClass: z.string().optional(),
  tags: z.array(z.string()),
  date: z.coerce.date(),
  timeline: z.object({ start: z.coerce.date(), end: z.coerce.date() }),
  technologies: z.array(z.string()),
})

export const ZStoreFetcherProjectsProject = z.intersection(
  ZStoreFetcherProjectsProjectProperties,
  ZStoreFetcherProjectsProjectMeta,
)

export const ZStoreFetcherProjectsData = z.object({
  list: z.record(z.string(), ZStoreFetcherProjectList),
  pages: z.record(z.string(), ZStoreFetcherProjectsProject),
})

export const ZStoreFetcherProjectsActions = z.object({
  setList: z.custom<(name: string, projects: z.infer<typeof ZStoreFetcherProjectList>) => void>(),
  setProjectPage: z.custom<(slug: string, project: z.infer<typeof ZStoreFetcherProjectsProjectProperties>) => void>(),
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

export type TStoreFetcherProjectList = z.infer<typeof ZStoreFetcherProjectList>
export type TStoreFetcherProjectsProjectMeta = z.infer<typeof ZStoreFetcherProjectsProjectMeta>
export type TStoreFetcherProjectsProjectProperties = z.infer<typeof ZStoreFetcherProjectsProjectProperties>
export type TStoreFetcherProjectsProject = z.infer<typeof ZStoreFetcherProjectsProject>
export type TStoreFetcherProjectsData = z.infer<typeof ZStoreFetcherProjectsData>
export type TStoreFetcherProjectsActions = z.infer<typeof ZStoreFetcherProjectsActions>
export type TStoreFetcherProjects = z.infer<typeof ZStoreFetcherProjects>
