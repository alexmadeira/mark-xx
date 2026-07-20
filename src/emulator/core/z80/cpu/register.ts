import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80CPURegister,
  TZ80CPURegisterDecrementProps,
  TZ80CPURegisterIncrementProps,
  TZ80CPURegisterUpdateIncrementFlagsProps,
  TZ80CPURegisterUpdateDecrementFlagsProps,
  TZ80CPURegisterCreateProps,
} from '@/emulator/core/z80/cpu/register'
import type { IZ80Flag } from '@/emulator/core/z80/flags'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_FLAG } from '_EMU/constants/z80'

export class Z80CPURegister implements IZ80CPURegister {
  constructor(
    private readonly byte: IZ80Byte,
    private readonly flag: IZ80Flag,
    private readonly state: IZ80State,
  ) {}

  static create(...props: TZ80CPURegisterCreateProps) {
    return new Z80CPURegister(...props)
  }

  private updateIncrementFlags(...[previous, value]: TZ80CPURegisterUpdateIncrementFlagsProps) {
    this.flag.updateSign(value)
    this.flag.updateZero(value)
    this.flag.set(Z80_FLAG.halfCarry, (previous & 0x0f) === 0x0f)
    this.flag.set(Z80_FLAG.parityOverflow, previous === 0x7f)
    this.flag.set(Z80_FLAG.subtract, false)
  }

  private updateDecrementFlags(...[previous, value]: TZ80CPURegisterUpdateDecrementFlagsProps) {
    this.flag.updateSign(value)
    this.flag.updateZero(value)
    this.flag.set(Z80_FLAG.halfCarry, (previous & 0x0f) === 0x00)
    this.flag.set(Z80_FLAG.parityOverflow, previous === 0x80)
    this.flag.set(Z80_FLAG.subtract, true)
  }

  public increment(...[register]: TZ80CPURegisterIncrementProps) {
    const previous = this.state[register]
    const value = this.byte.toByte(previous + 1)

    this.state[register] = value
    this.updateIncrementFlags(previous, value)
  }

  public decrement(...[register]: TZ80CPURegisterDecrementProps) {
    const previous = this.state[register]
    const value = this.byte.toByte(previous - 1)

    this.state[register] = value
    this.updateDecrementFlags(previous, value)
  }
}
