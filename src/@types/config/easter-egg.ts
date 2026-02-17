import { ZEEasterEggAllKey } from '@/enums/easter-egg'

import { z } from 'zod/v4'

export const ZConfigEasterEgg = z.object({
  name: z.string(),
  keyCombo: ZEEasterEggAllKey.array(),
})

export const ZConfigEasterEggs = ZConfigEasterEgg.array()

//
//
//
//

export type TConfigEasterEgg = z.infer<typeof ZConfigEasterEgg>
export type TConfigEasterEggs = z.infer<typeof ZConfigEasterEggs>
