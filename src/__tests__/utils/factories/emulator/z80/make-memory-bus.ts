import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'
import type { TZ80MemoryBusCreateProps } from '@/emulator/core/z80/memory-bus'

import { ByteMemory } from '_EMU/core/value-object/byte-memory'
import { Z80MemoryBus } from '_EMU/core/z80/memory-bus'

import { makeZ80Byte } from './make-byte'

export function makeZ80MemoryBus(overrides: Partial<TZ80MemoryBusCreateProps<IByteMemory>> = {}) {
  return Z80MemoryBus.create({
    byte: makeZ80Byte(),
    seed: 0x10000,
    createMemory: ByteMemory.create,
    ...overrides,
  })
}
