import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type { IZ80CPU16, TZ80CPU16CreateProps, TZ80CPU16PushProps } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80State } from '@/emulator/core/z80/state'

import _ from 'lodash'

export class Z80CPU16 implements IZ80CPU16 {
  constructor(
    private readonly byte: IZ80Byte,
    private readonly cpu8: IZ80CPU8,
    private readonly state: IZ80State,
  ) {
    _.bindAll(this, ['fetch', 'push', 'pop'])
  }

  static create(props: TZ80CPU16CreateProps) {
    return new Z80CPU16(props.byte, props.cpu8, props.state)
  }

  public fetch() {
    const low = this.cpu8.fetch()
    const high = this.cpu8.fetch()

    return this.byte.makeWord(low, high)
  }

  public push(...[value]: TZ80CPU16PushProps) {
    const word = this.byte.toWord(value)

    this.state.sp = this.byte.toWord(this.state.sp - 1)
    this.cpu8.write(this.state.sp, this.byte.getHighByte(word))

    this.state.sp = this.byte.toWord(this.state.sp - 1)
    this.cpu8.write(this.state.sp, this.byte.getLowByte(word))
  }

  public pop() {
    const low = this.cpu8.read(this.state.sp)
    this.state.sp = this.byte.toWord(this.state.sp + 1)

    const high = this.cpu8.read(this.state.sp)
    this.state.sp = this.byte.toWord(this.state.sp + 1)

    return this.byte.makeWord(low, high)
  }
}
