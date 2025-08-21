import { z } from 'zod/v4'

export const ZTechnologiesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZTechnologiesFetcherProps = z.object({
  callback: ZTechnologiesFetcherCallback.optional(),
})

//
//
//

export type TTechnologiesFetcherCallback = z.infer<typeof ZTechnologiesFetcherCallback>
export type TTechnologiesFetcherProps = z.infer<typeof ZTechnologiesFetcherProps>
