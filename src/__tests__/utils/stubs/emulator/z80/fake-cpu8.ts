import type { IZ80CPU8, TZ80CPU8Create, TZ80CPU8ReadProps, TZ80CPU8WriteProps } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80MemoryBus } from '@/emulator/core/z80/memory-bus'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80MemoryBusMock } from './fake-memory-bus'
import { Z80StateMock } from './fake-state'

export class Z80CPU8Mock implements IZ80CPU8 {
  constructor(
    private readonly state: IZ80State = new Z80StateMock(),
    private readonly memoryBus: IZ80MemoryBus = new Z80MemoryBusMock(),
  ) {}

  static readonly create = vi.fn<TZ80CPU8Create>()

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
