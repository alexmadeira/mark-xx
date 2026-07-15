import type {
  IZ80MemoryBus,
  TZ80MemoryBusLoadProps,
  TZ80MemoryBusReadProps,
  TZ80MemoryBusWriteProps,
} from '@/emulator/core/z80/memory-bus'

export class Z80MemoryBusMock implements IZ80MemoryBus {
  private readonly memory: Uint8Array

  constructor(size = 0x10000) {
    this.memory = new Uint8Array(size)
  }

  public readonly load = vi.fn((...[data, offset = 0]: TZ80MemoryBusLoadProps) => {
    for (let index = 0; index < data.length; index += 1) {
      this.memory[(offset + index) & 0xffff] = data[index] & 0xff
    }
  })

  public readonly read = vi.fn((...[address]: TZ80MemoryBusReadProps) => {
    return this.memory[address & 0xffff] & 0xff
  })

  public readonly write = vi.fn((...[address, value]: TZ80MemoryBusWriteProps) => {
    this.memory[address & 0xffff] = value & 0xff
  })

  public readonly reset = vi.fn((): void => {
    this.memory.fill(0)
  })
}
