import { ZPrismicDocumentProject } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

import { ZSchemaCompany } from './company'
import { ZSchemaTechnology } from './technology'

export const ZRawSchemaProject = ZPrismicDocumentProject
export const ZSchemaProject = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  role: z.string(),
  date: z.coerce.date(),
  tags: z.string().array(),
  color: z.string(),
  content: z.string(),
  teamSize: z.string(),
  highlight: z.boolean(),
  description: z.string(),
  logo: z.url().optional(),
  banner: z.url().optional(),
  thumbnail: z.url().optional(),
  bannerName: z.string().optional(),
  bannerClass: z.string().optional(),
  thumbnailClass: z.string().optional(),
  timeline: z.object({ start: z.coerce.date(), end: z.coerce.date() }),
  company: ZSchemaCompany,
  technologies: ZSchemaTechnology.array(),
})

//
//
//
//

export type TRawSchemaProject = z.infer<typeof ZRawSchemaProject>
export type tSchemaProject = z.infer<typeof ZSchemaProject>
