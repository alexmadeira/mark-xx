import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type { IZ80CPU8, TZ80CPU8ReadProps, TZ80CPU8WriteProps } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80MemoryBus } from '@/emulator/core/z80/memory-bus'
import type { IZ80State } from '@/emulator/core/z80/state'

import _ from 'lodash'

export class Z80CPU8 implements IZ80CPU8 {
  constructor(
    private readonly byte: IZ80Byte,
    private readonly state: IZ80State,
    private readonly memoryBus: IZ80MemoryBus,
  ) {
    _.bindAll(this, 'read', 'write', 'fetch')
  }

  public read(...[address]: TZ80CPU8ReadProps) {
    return this.byte.toByte(this.memoryBus.read(this.byte.toWord(address)))
  }

  public write(...[address, value]: TZ80CPU8WriteProps) {
    this.memoryBus.write(this.byte.toWord(address), this.byte.toByte(value))
  }

  public fetch() {
    const value = this.read(this.state.pc)

    this.state.pc = this.byte.toWord(this.state.pc + 1)

    return value
  }
}
