import { z } from 'zod/v4'

export const ZAwardsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZAwardsFetcherProps = z.object({
  callback: ZAwardsFetcherCallback.optional(),
})

//
//
//

export type TAwardsFetcherCallback = z.infer<typeof ZAwardsFetcherCallback>
export type TAwardsFetcherProps = z.infer<typeof ZAwardsFetcherProps>
