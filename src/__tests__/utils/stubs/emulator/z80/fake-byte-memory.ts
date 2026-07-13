import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'

type TZ80ByteMemoryMockSeed = number | ArrayLike<number>

export class Z80ByteMemoryMock extends Uint8Array implements IByteMemory {
  constructor(seed: TZ80ByteMemoryMockSeed = 0) {
    if (typeof seed === 'number') {
      super(seed)
      return
    }

    super(Array.from(seed))
  }

  static readonly create = vi.fn((seed: TZ80ByteMemoryMockSeed): IByteMemory => {
    return new Z80ByteMemoryMock(seed)
  })

  static readonly isByteMemory = vi.fn((value: unknown): value is Z80ByteMemoryMock => {
    return value instanceof Z80ByteMemoryMock
  })
}
