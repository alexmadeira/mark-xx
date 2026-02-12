import { z } from 'zod/v4'

export const ZPageFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZPageFetcherProps = z.object({
  callback: ZPageFetcherCallback.optional(),
})

//
//
//

export type TPageFetcherCallback = z.infer<typeof ZPageFetcherCallback>
export type TPageFetcherProps = z.infer<typeof ZPageFetcherProps>
