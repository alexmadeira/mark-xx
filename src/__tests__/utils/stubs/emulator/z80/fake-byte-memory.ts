import type { IByteMemory, TByteMemoryCreateProps } from '@/emulator/core/value-object/byte-memory'

export class Z80ByteMemoryMock extends Uint8Array implements IByteMemory {
  constructor(...[seed]: TByteMemoryCreateProps) {
    if (typeof seed === 'number') {
      super(seed)
      return
    }

    super(Array.from(seed))
  }

  static readonly create = vi.fn((...[seed]: TByteMemoryCreateProps) => {
    return new Z80ByteMemoryMock(seed)
  })

  static readonly isByteMemory = vi.fn((value: unknown): value is Z80ByteMemoryMock => {
    return value instanceof Z80ByteMemoryMock
  })
}
