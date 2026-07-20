import type { TZ80CPU8CreateProps } from '@/emulator/core/z80/cpu/cpu8'

import { Z80CPU8 } from '_EMU/core/z80/cpu/cpu8'

import { makeZ80Byte } from '../make-byte'
import { makeZ80MemoryBus } from '../make-memory-bus'
import { makeZ80State } from '../make-state'

export function makeZ80CPU8(overrides: Partial<TZ80CPU8CreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80MemoryBus = makeZ80MemoryBus({ byte: z80Byte })

  return Z80CPU8.create({
    byte: z80Byte,
    state: z80State,
    memoryBus: z80MemoryBus,
    ...overrides,
  })
}
