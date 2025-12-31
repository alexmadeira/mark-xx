import type { ZEPrismicPageType } from '@/enums/prismic'

import { ZEPageStatus } from '@/enums/page'

import { z } from 'zod/v4'

export const ZStoreFetcherPagesEmptyProperties = z.object({
  status: ZEPageStatus.exclude(['loaded']),
})

export const ZStoreFetcherPagesBaseProperties = z.object({
  status: ZEPageStatus,
  id: z.string(),
  slug: z.string(),
  color: z.string(),
  title: z.string(),
  description: z.string(),
  subTitle: z.string().optional(),
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
})

// export const ZStoreFetcherPagesHome = z.discriminatedUnion('status', [
//   ZStoreFetcherPagesHomeProperties,
//   ZStoreFetcherPagesEmptyProperties,
// ])
// export const ZStoreFetcherPagesAbout = z.discriminatedUnion('status', [
//   ZStoreFetcherPagesAboutProperties,
//   ZStoreFetcherPagesEmptyProperties,
// ])
// export const ZStoreFetcherPagesProjects = z.discriminatedUnion('status', [
//   ZStoreFetcherPagesProjectsProperties,
//   ZStoreFetcherPagesEmptyProperties,
// ])

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

// export const ZStoreFetcherSetPageContent = z.object({
//   home: ZStoreFetcherPagesHomeProperties,
//   about: ZStoreFetcherPagesAboutProperties,
//   projects: ZStoreFetcherPagesProjectsProperties,
// })

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

export type TStoreFetcherPagesEmptyProperties = z.infer<typeof ZStoreFetcherPagesEmptyProperties>
export type TStoreFetcherPagesBaseProperties = z.infer<typeof ZStoreFetcherPagesBaseProperties>
export type TStoreFetcherPagesHomeProperties = z.infer<typeof ZStoreFetcherPagesHomeProperties>
export type TStoreFetcherPagesAboutProperties = z.infer<typeof ZStoreFetcherPagesAboutProperties>
export type TStoreFetcherPagesProjectsProperties = z.infer<typeof ZStoreFetcherPagesProjectsProperties>
// export type TStoreFetcherPagesHome = z.infer<typeof ZStoreFetcherPagesHome>
// export type TStoreFetcherPagesAbout = z.infer<typeof ZStoreFetcherPagesAbout>
// export type TStoreFetcherPagesProjects = z.infer<typeof ZStoreFetcherPagesProjects>
export type TStoreFetcherPagesData = z.infer<typeof ZStoreFetcherPagesData>
export type TStoreFetcherPagesAnyData = z.infer<typeof ZStoreFetcherPagesAnyData>
// export type TStoreFetcherSetPageContent = z.infer<typeof ZStoreFetcherSetPageContent>
export type TStoreFetcherPagesActions = z.infer<typeof ZStoreFetcherPagesActions>
export type TStoreFetcherPages = z.infer<typeof ZStoreFetcherPages>
