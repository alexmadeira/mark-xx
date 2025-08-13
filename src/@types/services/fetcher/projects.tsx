import { z } from 'zod/v4'

export const ZProjectsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZProjectsFetcherFilter = z.object({
  role: z.string().optional(),
  company: z.string().optional(),
  highlight: z.boolean().optional(),
  technologies: z.string().optional(),
})

export const ZProjectsFetcherProps = z.object({
  filter: ZProjectsFetcherFilter.optional(),
  callback: ZProjectsFetcherCallback.optional(),
})

//
//
//

export type TProjectsFetcherFilter = z.infer<typeof ZProjectsFetcherFilter>
export type TProjectsFetcherCallback = z.infer<typeof ZProjectsFetcherCallback>
export type TProjectsFetcherProps = z.infer<typeof ZProjectsFetcherProps>
