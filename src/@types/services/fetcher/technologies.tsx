import { z } from 'zod/v4'

export const ZTechnologiesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZTechnologiesFetcherFilter = z.object({
  tags: z.array(z.string()).optional(),
})

export const ZTechnologiesFetcherProps = z.object({
  filter: ZTechnologiesFetcherFilter.optional(),
  callback: ZTechnologiesFetcherCallback.optional(),
})

//
//
//

export type TTechnologiesFetcherCallback = z.infer<typeof ZTechnologiesFetcherCallback>
export type TTechnologiesFetcherProps = z.infer<typeof ZTechnologiesFetcherProps>
