import type { ZEPrismicPageType } from '@/enums/prismic'

import { ZEPageStatus } from '@/enums/page'
import { ZSchemaPage } from '@/services/schema/page'

import { z } from 'zod/v4'

export const ZStoreFetcherPagesBaseProperties = z.object({
  ...ZSchemaPage.shape,
  status: ZEPageStatus,
})

export const ZStoreFetcherPagesHomeProperties = z.object({
  ...ZStoreFetcherPagesBaseProperties.shape,
})
export const ZStoreFetcherPagesProjectsProperties = z.object({
  ...ZStoreFetcherPagesBaseProperties.shape,
})
export const ZStoreFetcherPagesAboutProperties = z.object({
  ...ZStoreFetcherPagesBaseProperties.shape,
  movie: z.url(),
  awardsTitle: z.string(),
  awardsSubtitle: z.string(),
})

export const ZStoreFetcherPagesData = z.object({
  home: ZStoreFetcherPagesHomeProperties,
  about: ZStoreFetcherPagesAboutProperties,
  projects: ZStoreFetcherPagesProjectsProperties,
})

export const ZStoreFetcherPagesAnyData = z.union([
  ZStoreFetcherPagesHomeProperties,
  ZStoreFetcherPagesAboutProperties,
  ZStoreFetcherPagesProjectsProperties,
])

export const ZStoreFetcherPagesActions = z.object({
  setPage:
    z.custom<(name: z.infer<typeof ZEPrismicPageType>, content: z.infer<typeof ZStoreFetcherPagesAnyData>) => void>(),
  setPageStatus: z.custom<(name: z.infer<typeof ZEPrismicPageType>, status: z.infer<typeof ZEPageStatus>) => void>(),
})

export const ZStoreFetcherPages = z.object({
  data: ZStoreFetcherPagesData,
  actions: ZStoreFetcherPagesActions,
})

//
//
//
//

export type TStoreFetcherPagesBaseProperties = z.infer<typeof ZStoreFetcherPagesBaseProperties>
export type TStoreFetcherPagesHomeProperties = z.infer<typeof ZStoreFetcherPagesHomeProperties>
export type TStoreFetcherPagesAboutProperties = z.infer<typeof ZStoreFetcherPagesAboutProperties>
export type TStoreFetcherPagesProjectsProperties = z.infer<typeof ZStoreFetcherPagesProjectsProperties>
export type TStoreFetcherPagesData = z.infer<typeof ZStoreFetcherPagesData>
export type TStoreFetcherPagesAnyData = z.infer<typeof ZStoreFetcherPagesAnyData>
export type TStoreFetcherPagesActions = z.infer<typeof ZStoreFetcherPagesActions>
export type TStoreFetcherPages = z.infer<typeof ZStoreFetcherPages>
