import type { IZ80MemoryBus } from '@/emulator/core/z80/memory-bus'
import type {
  IZ80RomLoader,
  TZ80RomLoaderCreateProps,
  TZ80RomLoaderLoadProps,
  TZ80RomLoaderMemorySize,
} from '@/emulator/rom/z80/rom-loader'

export class Z80RomLoader implements IZ80RomLoader {
  constructor(
    private readonly memoryBus: IZ80MemoryBus,
    private readonly memorySize: TZ80RomLoaderMemorySize,
  ) {
    this.memorySize = Number.isFinite(memorySize) ? Math.max(0, Math.trunc(memorySize)) : 0
  }

  static create(props: TZ80RomLoaderCreateProps) {
    return new Z80RomLoader(props.memoryBus, props.memorySize)
  }

  public load(...[data, address]: TZ80RomLoaderLoadProps): void {
    if (address < 0) return
    if (!Number.isInteger(address)) return
    if (address >= this.memorySize) return

    const availableBytes = this.memorySize - address
    const rom = data.subarray(0, availableBytes)

    this.memoryBus.load(rom, address)
  }
}
