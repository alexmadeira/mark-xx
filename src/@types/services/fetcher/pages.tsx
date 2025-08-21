import { z } from 'zod/v4'

export const ZPagesFetcherCallback = z.custom<() => z.infer<z.ZodVoid>>().nullish()

export const ZPagesFetcherProps = z.object({
  callback: ZPagesFetcherCallback.optional(),
})

//
//
//

export type TPagesFetcherCallback = z.infer<typeof ZPagesFetcherCallback>
export type TPagesFetcherProps = z.infer<typeof ZPagesFetcherProps>
