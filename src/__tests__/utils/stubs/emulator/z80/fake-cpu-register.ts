import type {
  IZ80CPURegister,
  TZ80CPURegisterDecrementProps,
  TZ80CPURegisterIncrementProps,
} from '@/emulator/core/z80/cpu/register'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80StateMock } from './fake-state'

export class Z80CPURegisterMock implements IZ80CPURegister {
  constructor(private readonly state: IZ80State = new Z80StateMock()) {}

  public readonly increment = vi.fn((...[register]: TZ80CPURegisterIncrementProps) => {
    this.state[register] = (this.state[register] + 1) & 0xff
  })

  public readonly decrement = vi.fn((...[register]: TZ80CPURegisterDecrementProps) => {
    this.state[register] = (this.state[register] - 1) & 0xff
  })
}
