import type { IByteMemory, TByteMemoryCreate, TByteMemoryUint8memory } from '@/emulator/core/value-object/byte-memory'

export class Z80ByteMemoryMock extends Uint8Array implements IByteMemory {
  constructor(uint8memory: TByteMemoryUint8memory) {
    super(uint8memory)
  }

  static readonly create = vi.fn<TByteMemoryCreate>((seed) => {
    if (typeof seed === 'number') return new Z80ByteMemoryMock(new Uint8Array(seed))
    if (seed instanceof Z80ByteMemoryMock) return seed

    return new Z80ByteMemoryMock(new Uint8Array(seed))
  })

  static readonly isByteMemory = vi.fn((value: unknown): value is Z80ByteMemoryMock => {
    return value instanceof Z80ByteMemoryMock
  })
}
