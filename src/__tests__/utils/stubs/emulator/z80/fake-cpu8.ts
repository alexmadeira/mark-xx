import type { IZ80CPU8, TZ80CPU8ReadProps, TZ80CPU8WriteProps } from '@/emulator/core/z80/cpu/cpu8'

import { Z80MemoryBusMock } from './fake-memory-bus'
import { Z80StateMock } from './fake-state'

export class Z80CPU8Mock implements IZ80CPU8 {
  constructor(
    private readonly state = new Z80StateMock(),
    private readonly memoryBus = new Z80MemoryBusMock(),
  ) {}

  public readonly read = vi.fn((...[address]: TZ80CPU8ReadProps) => {
    return this.memoryBus.read(address)
  })

  public readonly write = vi.fn((...[address, value]: TZ80CPU8WriteProps) => {
    this.memoryBus.write(address, value)
  })

  public readonly fetch = vi.fn(() => {
    const value = this.read(this.state.pc)

    this.state.pc = (this.state.pc + 1) & 0xffff

    return value
  })
}
