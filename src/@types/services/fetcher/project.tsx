import { z } from 'zod/v4'

export const ZProjectFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZProjectFetcherProps = z.object({
  callback: ZProjectFetcherCallback.optional(),
})

//
//
//

export type TProjectFetcherCallback = z.infer<typeof ZProjectFetcherCallback>
export type TProjectFetcherProps = z.infer<typeof ZProjectFetcherProps>
