import { z } from 'zod/v4'

export const ZUsageLanguageFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZUsageLanguageFetcherProps = z.object({
  callback: ZUsageLanguageFetcherCallback.optional(),
})

//
//
//

export type TUsageLanguageFetcherCallback = z.infer<typeof ZUsageLanguageFetcherCallback>
export type TUsageLanguageFetcherProps = z.infer<typeof ZUsageLanguageFetcherProps>
