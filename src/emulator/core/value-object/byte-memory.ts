import type {
  IByteMemory,
  TByteMemoryCreateProps,
  TByteMemoryUint8memory,
} from '@/emulator/core/value-object/byte-memory'

export class ByteMemory extends Uint8Array implements IByteMemory {
  protected constructor(uint8memory: TByteMemoryUint8memory) {
    super(uint8memory)
  }

  static create(...[seed]: TByteMemoryCreateProps) {
    if (typeof seed === 'number') return new ByteMemory(new Uint8Array(seed))
    if (!ByteMemory.isByteMemory(seed)) return new ByteMemory(new Uint8Array(seed))

    return seed
  }

  static isByteMemory(value: unknown): value is ByteMemory {
    return value instanceof ByteMemory
  }
}
