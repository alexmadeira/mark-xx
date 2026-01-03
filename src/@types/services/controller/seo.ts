import { z } from 'zod/v4'

export const ZSEOResolveTitleProps = z.tuple([z.string().nullish()])

export const ZSEOProps = z.object({
  locale: z.string(),
  siteName: z.string(),
  titleTemplate: z.string().optional(),
  defaultTitle: z.string(),
})

//
//
//
//

export type TSEOResolveTitleProps = z.infer<typeof ZSEOResolveTitleProps>

export type TSEOProps = z.infer<typeof ZSEOProps>
