import type {
  IByteMemory,
  TByteMemoryCreateProps,
  TByteMemoryUint8memory,
} from '@/emulator/core/value-object/byte-memory'

export class ByteMemory extends Uint8Array implements IByteMemory {
  protected constructor(uint8memory: TByteMemoryUint8memory) {
    super(uint8memory)
  }

  static create(...[data]: TByteMemoryCreateProps) {
    if (typeof data === 'number') return new ByteMemory(new Uint8Array(data))
    if (!ByteMemory.isByteMemory(data)) return new ByteMemory(new Uint8Array(data))

    return data
  }

  static isByteMemory(value: unknown): value is ByteMemory {
    return value instanceof ByteMemory
  }
}
