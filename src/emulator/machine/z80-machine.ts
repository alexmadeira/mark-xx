import type { IZ80CPU } from '@/emulator/core/z80/cpu'
import type { IZ80MemoryBus } from '@/emulator/core/z80/memory-bus'
import type { IZ80Machine, TZ80MachineCreateProps } from '@/emulator/machine/z80-machine'

export class Z80Machine implements IZ80Machine {
  private cycleBalance = 0

  constructor(
    public readonly cpu: IZ80CPU,
    public readonly memoryBus: IZ80MemoryBus,
    private readonly cyclesPerFrame: number,
  ) {
    this.cyclesPerFrame = Number.isFinite(cyclesPerFrame) ? Math.max(0, Math.floor(cyclesPerFrame)) : 0
  }

  static create(props: TZ80MachineCreateProps) {
    return new Z80Machine(props.cpu, props.memoryBus, props.cyclesPerFrame)
  }

  public reset() {
    this.cpu.reset()
    this.cycleBalance = 0
  }

  public step() {
    return this.cpu.step()
  }

  public runFrame() {
    this.cycleBalance += this.cyclesPerFrame

    while (this.cycleBalance > 0) {
      this.cycleBalance -= this.step()
    }
  }
}
