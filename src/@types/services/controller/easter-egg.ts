import { ZEEasterEggAllKey } from '@/enums/easter-egg'

import { z } from 'zod/v4'

export const ZEasterEggEgg = z.object({
  name: z.string(),
  keyCombo: ZEEasterEggAllKey.array(),
})

export const ZEasterEggDispatchEggProps = z.tuple([z.string()])
export const ZEasterEggReadEggProps = z.tuple([z.string()])
export const ZEasterEggAddEggProps = ZEasterEggEgg
export const ZEasterEggAddEggsProps = ZEasterEggEgg.array()

//
//
//

export type TEasterEggEgg = z.infer<typeof ZEasterEggEgg>

export type TEasterEggDispatchEggProps = z.infer<typeof ZEasterEggDispatchEggProps>
export type TEasterEggReadEggProps = z.infer<typeof ZEasterEggReadEggProps>
export type TEasterEggAddEggProps = z.infer<typeof ZEasterEggAddEggProps>
export type TEasterEggAddEggsProps = z.infer<typeof ZEasterEggAddEggsProps>
