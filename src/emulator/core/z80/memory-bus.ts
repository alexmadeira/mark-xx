import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'
import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80MemoryBus,
  TZ80MemoryBusCreateMemory,
  TZ80MemoryBusLoadProps,
  TZ80MemoryBusMemorySeed,
  TZ80MemoryBusReadProps,
  TZ80MemoryBusWriteProps,
} from '@/emulator/core/z80/memory-bus'

export class Z80MemoryBus implements IZ80MemoryBus {
  private readonly memory: IByteMemory

  constructor(
    memorySeed: TZ80MemoryBusMemorySeed,
    private readonly byte: IZ80Byte,
    private readonly createMemory: TZ80MemoryBusCreateMemory<IByteMemory>,
  ) {
    this.memory = this.createMemory(memorySeed)
    this.setup()
  }

  private setup() {
    this.load(this.memory)
  }

  public load(...[data, offset = 0]: TZ80MemoryBusLoadProps) {
    const memoryData = this.createMemory(data)

    for (let index = 0; index < memoryData.length; index += 1) {
      this.memory[this.byte.toWord(this.byte.toWord(offset) + index)] = this.byte.toByte(memoryData[index])
    }
  }
  public read(...[address]: TZ80MemoryBusReadProps) {
    return this.byte.toByte(this.memory[this.byte.toWord(address)])
  }

  public write(...[address, value]: TZ80MemoryBusWriteProps) {
    this.memory[this.byte.toWord(address)] = this.byte.toByte(value)
  }

  public reset() {
    this.memory.fill(0)
  }
}
