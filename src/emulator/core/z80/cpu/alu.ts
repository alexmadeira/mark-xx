import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80CPUAlu,
  TZ80CPUAluAddProps,
  TZ80CPUAluSubProps,
  TZ80CPUAluUpdateAddFlagsProps,
  TZ80CPUAluUpdateSubFlagsProps,
  TZ80CPUAluUpdateLogicFlagsProps,
  TZ80CPUAluUpdateResultFlagsProps,
  TZ80CPUAluValueProps,
  TZ80CPUAluCreateProps,
} from '@/emulator/core/z80/cpu/alu'
import type { IZ80Flag } from '@/emulator/core/z80/flags'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_FLAG } from '_EMU/constants/z80'

export class Z80CPUAlu implements IZ80CPUAlu {
  constructor(
    private readonly state: IZ80State,
    private readonly flag: IZ80Flag,
    private readonly byte: IZ80Byte,
  ) {}

  static create(...props: TZ80CPUAluCreateProps) {
    return new Z80CPUAlu(...props)
  }

  private updateAddFlags(...[left, right, carry, result, value]: TZ80CPUAluUpdateAddFlagsProps) {
    this.updateResultFlags(value)
    this.flag.set(Z80_FLAG.halfCarry, (left & 0x0f) + (right & 0x0f) + carry > 0x0f)
    this.flag.set(Z80_FLAG.parityOverflow, (~(left ^ right) & (left ^ value) & 0x80) !== 0)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, result > 0xff)
  }

  private updateSubFlags(...[left, right, carry, result, value]: TZ80CPUAluUpdateSubFlagsProps) {
    this.updateResultFlags(value)
    this.flag.set(Z80_FLAG.halfCarry, (left & 0x0f) - (right & 0x0f) - carry < 0)
    this.flag.set(Z80_FLAG.parityOverflow, ((left ^ right) & (left ^ value) & 0x80) !== 0)
    this.flag.set(Z80_FLAG.subtract, true)
    this.flag.set(Z80_FLAG.carry, result < 0)
  }

  private updateLogicFlags(...[value, halfCarry]: TZ80CPUAluUpdateLogicFlagsProps) {
    this.updateResultFlags(value)
    this.flag.updateParity(value)
    this.flag.set(Z80_FLAG.halfCarry, halfCarry)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, false)
  }

  private updateResultFlags(...[value]: TZ80CPUAluUpdateResultFlagsProps) {
    this.flag.updateSign(value)
    this.flag.updateZero(value)
  }

  public cp(...[value]: TZ80CPUAluValueProps) {
    const left = this.byte.toByte(this.state.a)
    const right = this.byte.toByte(value)
    const result = left - right

    this.updateSubFlags(left, right, 0, result, this.byte.toByte(result))
  }

  public or(...[value]: TZ80CPUAluValueProps) {
    const right = this.byte.toByte(value)
    const result = this.byte.toByte(this.state.a | right)

    this.state.a = result
    this.updateLogicFlags(result, false)
  }

  public add(...[value, withCarry = false]: TZ80CPUAluAddProps) {
    const left = this.byte.toByte(this.state.a)
    const right = this.byte.toByte(value)
    const carry = withCarry && this.flag.hasFlag(Z80_FLAG.carry) ? 1 : 0
    const result = left + right + carry
    const byteResult = this.byte.toByte(result)

    this.state.a = byteResult
    this.updateAddFlags(left, right, carry, result, byteResult)
  }

  public sub(...[value, withCarry = false]: TZ80CPUAluSubProps) {
    const left = this.byte.toByte(this.state.a)
    const right = this.byte.toByte(value)
    const carry = withCarry && this.flag.hasFlag(Z80_FLAG.carry) ? 1 : 0
    const result = left - right - carry
    const byteResult = this.byte.toByte(result)

    this.state.a = byteResult
    this.updateSubFlags(left, right, carry, result, byteResult)
  }

  public and(...[value]: TZ80CPUAluValueProps) {
    const right = this.byte.toByte(value)
    const result = this.byte.toByte(this.state.a & right)

    this.state.a = result
    this.updateLogicFlags(result, true)
  }

  public xor(...[value]: TZ80CPUAluValueProps) {
    const right = this.byte.toByte(value)
    const result = this.byte.toByte(this.state.a ^ right)

    this.state.a = result
    this.updateLogicFlags(result, false)
  }
}
