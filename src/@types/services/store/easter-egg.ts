import { ZEEasterEggStatus } from '@/enums/easter-egg'

import { z } from 'zod/v4'

export const ZStoreEasterEggEgg = z.object({
  called: z.number(),
  status: ZEEasterEggStatus,
})
export const ZStoreEasterEggEggs = z.record(z.string(), ZStoreEasterEggEgg)

export const ZStoreEasterEggData = z.object({
  eggs: ZStoreEasterEggEggs,
})

export const ZStoreEasterEggActions = z.object({
  setEgg: z.custom<(name: string) => void>(),
  setStatus: z.custom<(name: string, status: z.infer<typeof ZEEasterEggStatus>) => void>(),
  call: z.custom<(name: string) => void>(),
  read: z.custom<(name: string) => void>(),
  destroy: z.custom<() => void>(),
})

export const ZStoreEasterEgg = z.object({
  data: ZStoreEasterEggData,
  actions: ZStoreEasterEggActions,
})

//
//
//
//

export type TStoreEasterEggEgg = z.infer<typeof ZStoreEasterEggEgg>
export type TStoreEasterEggEggs = z.infer<typeof ZStoreEasterEggEggs>

export type TStoreEasterEggData = z.infer<typeof ZStoreEasterEggData>
export type TStoreEasterEggActions = z.infer<typeof ZStoreEasterEggActions>
export type TStoreEasterEgg = z.infer<typeof ZStoreEasterEgg>
