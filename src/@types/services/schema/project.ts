import { z } from 'zod/v4'

import { ZSchemaPageBlock } from './page'

export const ZSchemaProjectTag = z.object({ id: z.string(), name: z.string() })
export const ZSchemaProjectDate = z.object({ start: z.coerce.date() })
export const ZSchemaProjectTimeline = z.object({ start: z.coerce.date(), end: z.coerce.date() })
export const ZSchemaProjectTechnology = z.object({ id: z.string(), name: z.string() })

export const ZSchemaProject = z.object({
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
  tags: z.array(ZSchemaProjectTag),
  date: ZSchemaProjectDate,
  timeline: ZSchemaProjectTimeline,
  technologies: z.array(ZSchemaProjectTechnology),
  createdAt: z.coerce.date(),
  lastEdited: z.coerce.date(),
})

export const ZSchemaProjectPage = z.object({
  content: z.array(ZSchemaPageBlock),
  properties: ZSchemaProject,
})
//
//
//
//

export type TSchemaProjectTag = z.infer<typeof ZSchemaProjectTag>
export type TSchemaProjectDate = z.infer<typeof ZSchemaProjectDate>
export type TSchemaProjectTimeline = z.infer<typeof ZSchemaProjectTimeline>
export type TSchemaProjectTechnology = z.infer<typeof ZSchemaProjectTechnology>
export type TSchemaProject = z.infer<typeof ZSchemaProject>
export type TSchemaProjectPage = z.infer<typeof ZSchemaProjectPage>
