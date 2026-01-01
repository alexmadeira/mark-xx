import { z } from 'zod/v4'

export const ZProjectsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZProjectsFetcherFilter = z.object({
  tags: z.array(z.string()).optional(),
  fields: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.coerce.date(), z.string().array()]))
    .optional(),
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
