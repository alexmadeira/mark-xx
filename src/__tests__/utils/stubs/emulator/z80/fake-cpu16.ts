import type { IZ80CPU16, TZ80CPU16Create, TZ80CPU16PushProps } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80CPU8Mock } from './fake-cpu8'
import { Z80StateMock } from './fake-state'

export class Z80CPU16Mock implements IZ80CPU16 {
  constructor(
    private readonly cpu8: IZ80CPU8 = new Z80CPU8Mock(),
    private readonly state: IZ80State = new Z80StateMock(),
  ) {}

  static readonly create = vi.fn<TZ80CPU16Create>()

  public readonly fetch = vi.fn(() => {
    const low = this.cpu8.fetch()
    const high = this.cpu8.fetch()

    return ((high << 8) | low) & 0xffff
  })

  public readonly push = vi.fn((...[value]: TZ80CPU16PushProps) => {
    const word = value & 0xffff

    this.state.sp = (this.state.sp - 1) & 0xffff
    this.cpu8.write(this.state.sp, (word >> 8) & 0xff)

    this.state.sp = (this.state.sp - 1) & 0xffff
    this.cpu8.write(this.state.sp, word & 0xff)
  })

  public readonly pop = vi.fn(() => {
    const low = this.cpu8.read(this.state.sp)
    this.state.sp = (this.state.sp + 1) & 0xffff

    const high = this.cpu8.read(this.state.sp)
    this.state.sp = (this.state.sp + 1) & 0xffff

    return ((high << 8) | low) & 0xffff
  })
}
