import type {
  IZ80Flag,
  TZ80FlagSetProps,
  TZ80FlagHasFlagProps,
  TZ80FlagUpdateSignProps,
  TZ80FlagUpdateZeroProps,
  TZ80FlagUpdateParityProps,
  TZ80FlagCalculateParityProps,
} from '@/emulator/core/z80/flags'

import { Z80_FLAG } from '_EMU/constants/z80'

import { Z80StateMock } from './fake-state'

export class Z80FlagMock implements IZ80Flag {
  constructor(private readonly state = new Z80StateMock()) {
    this.state = state
  }

  public readonly set = vi.fn((...[flag, enabled]: TZ80FlagSetProps) => {
    const byteFlag = flag & 0xff

    this.state.f = enabled ? (this.state.f | byteFlag) & 0xff : this.state.f & ~byteFlag & 0xff
  })

  public readonly hasFlag = vi.fn((...[flag]: TZ80FlagHasFlagProps) => {
    return (this.state.f & (flag & 0xff)) !== 0
  })

  public readonly updateSign = vi.fn((...[value]: TZ80FlagUpdateSignProps) => {
    this.set(Z80_FLAG.sign, (value & 0xff & Z80_FLAG.sign) !== 0)
  })

  public readonly updateZero = vi.fn((...[value]: TZ80FlagUpdateZeroProps) => {
    this.set(Z80_FLAG.zero, (value & 0xff) === 0)
  })

  public readonly updateParity = vi.fn((...[value]: TZ80FlagUpdateParityProps) => {
    this.set(Z80_FLAG.parityOverflow, this.calculateParity(value))
  })

  public readonly calculateParity = vi.fn((...[value]: TZ80FlagCalculateParityProps) => {
    let byte = value & 0xff
    let bits = 0

    while (byte > 0) {
      bits += byte & 0x01
      byte >>= 1
    }

    return bits % 2 === 0
  })
}
