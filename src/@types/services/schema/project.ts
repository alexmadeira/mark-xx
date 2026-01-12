import { ZEProjectBlockFullImageSize, ZEProjectBlockImageGridHoverStyle } from '@/enums/project'
import {
  ZPrismicDocumentProject,
  ZPrismicDocumentProjectContentFullImage,
  ZPrismicDocumentProjectContentImagemGrid,
  ZPrismicDocumentProjectContents,
} from '@/prismic/mark-xx'

import { z } from 'zod/v4'

import { ZSchemaCompany } from './company'
import { ZSchemaTechnology } from './technology'

export const ZRawSchemaProject = ZPrismicDocumentProject
export const ZRawSchemaProjectContents = ZPrismicDocumentProjectContents
export const ZRawSchemaProjectContentFullImage = ZPrismicDocumentProjectContentFullImage
export const ZRawSchemaProjectContentImagemGrid = ZPrismicDocumentProjectContentImagemGrid

export const ZSchemaProjectContentFullImage = z.object({
  type: z.literal('full_image'),
  color: z.string(),
  url: z.url().optional(),
  size: ZEProjectBlockFullImageSize,
})

export const ZSchemaProjectContentImageGrid = z.object({
  type: z.literal('image_grid'),
  gap: z.boolean(),
  columns: z.number(),
  hoverStyle: ZEProjectBlockImageGridHoverStyle,
  images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
      rows: z.number(),
      cols: z.number(),
      url: z.url().optional(),
    }),
  ),
})

export const ZSchemaProjectContent = z.discriminatedUnion('type', [
  ZSchemaProjectContentFullImage,
  ZSchemaProjectContentImageGrid,
])
export const ZSchemaProjectContents = z.record(z.string(), ZSchemaProjectContent)

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
  logoColor: z.string().optional(),
  bannerName: z.string().optional(),
  bannerClass: z.string().optional(),
  thumbnailClass: z.string().optional(),
  timeline: z.object({ start: z.coerce.date(), end: z.coerce.date() }),
  company: ZSchemaCompany,
  contents: ZSchemaProjectContents,
  technologies: ZSchemaTechnology.array(),
})

//
//
//
//

export type TRawSchemaProject = z.infer<typeof ZRawSchemaProject>
export type TSchemaProjectContents = z.infer<typeof ZSchemaProjectContents>
export type TRawSchemaProjectContentFullImage = z.infer<typeof ZRawSchemaProjectContentFullImage>
export type TRawSchemaProjectContentImagemGrid = z.infer<typeof ZRawSchemaProjectContentImagemGrid>

export type TSchemaProjectContentFullImage = z.infer<typeof ZSchemaProjectContentFullImage>
export type TSchemaProjectContentImageGrid = z.infer<typeof ZSchemaProjectContentImageGrid>
export type TSchemaProjectContent = z.infer<typeof ZSchemaProjectContent>
export type TRawSchemaProjectContents = z.infer<typeof ZRawSchemaProjectContents>
export type TSchemaProject = z.infer<typeof ZSchemaProject>
