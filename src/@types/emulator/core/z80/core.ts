import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80CPU } from '@/emulator/core/z80/cpu'
import { ZZ80Flag } from '@/emulator/core/z80/flags'
import { ZZ80MemoryBus, ZZ80MemoryBusCreateMemory } from '@/emulator/core/z80/memory-bus'
import { ZZ80State } from '@/emulator/core/z80/state'

export function ZZ80CoreProps<TMenory>() {
  return z.object({
    memory: z.custom<ArrayLike<number>>().optional(),
    memorySize: z.number(),
    createMemory: ZZ80MemoryBusCreateMemory<TMenory>(),
  })
}

export const ZZ80Core = z.object({
  cpu: ZZ80CPU,
  byte: ZZ80Byte,
  flag: ZZ80Flag,
  state: ZZ80State,
  memoryBus: ZZ80MemoryBus,
})

//
//
//

export type TZ80CoreProps<TMenory> = z.inferGeneric<typeof ZZ80CoreProps<TMenory>>

export interface IZ80Core extends z.infer<typeof ZZ80Core> {}
