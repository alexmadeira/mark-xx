import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80Flag,
  TZ80FlagCalculateParityProps,
  TZ80FlagCreateProps,
  TZ80FlagHasFlagProps,
  TZ80FlagSetProps,
  TZ80FlagUpdateParityProps,
  TZ80FlagUpdateSignProps,
  TZ80FlagUpdateZeroProps,
} from '@/emulator/core/z80/flags'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_FLAG } from '_EMU/constants/z80'

export class Z80Flag implements IZ80Flag {
  constructor(
    private readonly byte: IZ80Byte,
    private readonly state: IZ80State,
  ) {}

  static create(...props: TZ80FlagCreateProps) {
    return new Z80Flag(...props)
  }

  public hasFlag(...[flag]: TZ80FlagHasFlagProps) {
    return (this.state.f & this.byte.toByte(flag)) !== 0
  }

  public set(...[flag, enabled]: TZ80FlagSetProps) {
    const byteFlag = this.byte.toByte(flag)

    this.state.f = enabled ? this.byte.toByte(this.state.f | byteFlag) : this.byte.toByte(this.state.f & ~byteFlag)
  }

  public updateSign(...[value]: TZ80FlagUpdateSignProps) {
    this.set(Z80_FLAG.sign, (this.byte.toByte(value) & Z80_FLAG.sign) !== 0)
  }

  public updateZero(...[value]: TZ80FlagUpdateZeroProps) {
    this.set(Z80_FLAG.zero, this.byte.toByte(value) === 0)
  }

  public updateParity(...[value]: TZ80FlagUpdateParityProps) {
    this.set(Z80_FLAG.parityOverflow, this.calculateParity(value))
  }

  public calculateParity(...[value]: TZ80FlagCalculateParityProps) {
    let byte = this.byte.toByte(value)
    let bits = 0

    while (byte > 0) {
      bits += byte & 0x01
      byte >>= 1
    }

    return bits % 2 === 0
  }
}
