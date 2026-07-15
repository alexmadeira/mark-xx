import type {
  IZ80CPU,
  TZ80CPUFetch16,
  TZ80CPUFetch8,
  TZ80CPUPop16,
  TZ80CPUPush16,
  TZ80CPURead8,
  TZ80CPUWrite8,
} from '@/emulator/core/z80/cpu'
import type { IZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80CPUExecutor } from '@/emulator/core/z80/cpu/executor'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_CYCLES } from '_EMU/constants/z80'
import _ from 'lodash'

export class Z80CPU implements IZ80CPU {
  public readonly read8: TZ80CPURead8
  public readonly fetch8: TZ80CPUFetch8
  public readonly write8: TZ80CPUWrite8

  public readonly pop16: TZ80CPUPop16
  public readonly push16: TZ80CPUPush16
  public readonly fetch16: TZ80CPUFetch16

  constructor(
    public readonly state: IZ80State,
    private readonly cpu8: IZ80CPU8,
    private readonly cpu16: IZ80CPU16,
    private readonly executor: IZ80CPUExecutor,
  ) {
    this.read8 = this.cpu8.read
    this.fetch8 = this.cpu8.fetch
    this.write8 = this.cpu8.write

    this.pop16 = this.cpu16.pop
    this.push16 = this.cpu16.push
    this.fetch16 = this.cpu16.fetch

    _.bindAll(this, 'reset', 'step', 'requestInterrupt')
  }

  public reset() {
    this.state.reset()
  }

  public step() {
    if (this.state.halted) return Z80_CYCLES.halt

    const opcodePc = this.state.pc
    const opcode = this.fetch8()

    return this.executor.executeOpcode(opcode, opcodePc)
  }

  public requestInterrupt(vector?: number) {
    void vector

    if (!this.state.iff1) {
      return
    }

    this.state.iff1 = false
    this.state.iff2 = false
    this.state.halted = false
    // IM 0/1/2 vector dispatch will be implemented with the interrupt opcode family.
  }
}
