import { ZPrismicDocumentProject } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZSchemaProjectTag = z.object({ id: z.string(), name: z.string() })
export const ZSchemaProjectDate = z.object({ start: z.coerce.date() })
export const ZSchemaProjectTimeline = z.object({ start: z.coerce.date(), end: z.coerce.date() })
export const ZSchemaProjectTechnology = z.object({ id: z.string(), name: z.string() })

export const ZSchemaProject = ZPrismicDocumentProject

export const ZSchemaProjectPage = z.object({
  // content: ZSchemaPageContent,
  // properties: ZSchemaProject,
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
