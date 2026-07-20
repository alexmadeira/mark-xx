import type { IZ80CPU } from '@/emulator/core/z80/cpu'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80StateMock } from './fake-state'

export class Z80CPUMock implements IZ80CPU {
  constructor(public readonly state: IZ80State = new Z80StateMock()) {}

  static create = vi.fn((state: IZ80State) => {
    return new Z80CPUMock(state)
  })

  public readonly read8 = vi.fn<IZ80CPU['read8']>()
  public readonly fetch8 = vi.fn<IZ80CPU['fetch8']>()
  public readonly write8 = vi.fn<IZ80CPU['write8']>()

  public readonly pop16 = vi.fn<IZ80CPU['pop16']>()
  public readonly push16 = vi.fn<IZ80CPU['push16']>()
  public readonly fetch16 = vi.fn<IZ80CPU['fetch16']>()

  public readonly step = vi.fn<IZ80CPU['step']>()
  public readonly reset = vi.fn<IZ80CPU['reset']>()
  public readonly requestInterrupt = vi.fn<IZ80CPU['requestInterrupt']>()
}
