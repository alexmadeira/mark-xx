import type { TSchemaEasterEggEvent } from '@/services/schema/easter-egg'

import { interfaceEvent } from '_SRV/builder/event'

export const eggEvents = [
  {
    emitter: interfaceEvent,
    event: 'INTERFACE:Hero:email',
    foundEgg: 'email',
  },
  {
    emitter: interfaceEvent,
    event: 'INTERFACE:Activity:idle',
    foundEgg: 'sonic',
  },
  {
    emitter: interfaceEvent,
    event: 'INTERFACE:Activity:active',
    readEgg: 'sonic',
  },
] as const satisfies TSchemaEasterEggEvent[]
