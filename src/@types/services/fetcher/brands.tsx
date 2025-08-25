import { z } from 'zod/v4'

export const ZBrandsFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZBrandsFetcherProps = z.object({
  callback: ZBrandsFetcherCallback.optional(),
})

//
//
//

export type TBrandsFetcherCallback = z.infer<typeof ZBrandsFetcherCallback>
export type TBrandsFetcherProps = z.infer<typeof ZBrandsFetcherProps>
