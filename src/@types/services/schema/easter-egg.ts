import type { IEvent } from '@/interfaces/event'

import { z } from 'zod/v4'

import { ZEEasterEggAllKey } from '@/enums/easter-egg'
import { ZEvents } from '@/events'

export const ZSchemaEasterEgg = z.object({
  name: z.string(),
  keyCombo: ZEEasterEggAllKey.array().optional(),
})

const ZSchemaEasterEggBaseEvent = z.object({
  emitter: z.custom<IEvent>(),
  event: ZEvents.keyof(),
})

const ZSchemaEasterEggFoundEvent = ZSchemaEasterEggBaseEvent.extend({
  foundEgg: z.string(),
  readEgg: z.never().optional(),
})
const ZSchemaEasterEggReadEvent = ZSchemaEasterEggBaseEvent.extend({
  readEgg: z.string(),
  foundEgg: z.never().optional(),
})

export const ZSchemaEasterEggEvent = z.union([ZSchemaEasterEggFoundEvent, ZSchemaEasterEggReadEvent])

//
//
//
//

export type TSchemaEasterEgg = z.infer<typeof ZSchemaEasterEgg>
export type TSchemaEasterEggEvent = z.infer<typeof ZSchemaEasterEggEvent>
