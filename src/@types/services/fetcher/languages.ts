import { z } from 'zod/v4'

export const ZLanguagesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()
export const ZLanguagesFetcherParams = z.object({
  name: z.string(),
  owner: z.string(),
})

export const ZLanguagesFetcherProps = z.object({
  params: ZLanguagesFetcherParams,
  callback: ZLanguagesFetcherCallback.optional(),
})

//
//
//

export type TLanguagesFetcherCallback = z.infer<typeof ZLanguagesFetcherCallback>
export type TLanguagesFetcherParams = z.infer<typeof ZLanguagesFetcherParams>
export type TLanguagesFetcherProps = z.infer<typeof ZLanguagesFetcherProps>
