import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80CBInstruction,
  TZ80CBInstructionBitProps,
  TZ80CBInstructionCreateProps,
  TZ80CBInstructionExecuteOpcodeProps,
  TZ80CBInstructionHandlers,
  TZ80CBInstructionReadOperandProps,
  TZ80CBInstructionResetProps,
  TZ80CBInstructionRotateProps,
  TZ80CBInstructionSetProps,
  TZ80CBInstructionWriteOperandProps,
} from '@/emulator/core/z80/cpu/cb-instruction'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80Flag } from '@/emulator/core/z80/flags'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_CPU, Z80_CYCLES, Z80_FLAG } from '_EMU/constants/z80'

import { Z80OpcodeNotImplementedError } from '../errors'

export class Z80CBInstruction implements IZ80CBInstruction {
  private readonly handlers: TZ80CBInstructionHandlers

  constructor(
    private readonly byte: IZ80Byte,
    private readonly cpu8: IZ80CPU8,
    private readonly flag: IZ80Flag,
    private readonly state: IZ80State,
  ) {
    this.handlers = this.createHandlers()
  }

  static create(props: TZ80CBInstructionCreateProps) {
    return new Z80CBInstruction(props.byte, props.cpu8, props.flag, props.state)
  }

  private readOperand(...[operand]: TZ80CBInstructionReadOperandProps) {
    return !operand ? this.cpu8.read(this.state.hl) : this.byte.toByte(this.state[operand])
  }
  private writeOperand(...[operand, value]: TZ80CBInstructionWriteOperandProps) {
    const result = this.byte.toByte(value)

    if (!operand) return this.cpu8.write(this.state.hl, result)

    this.state[operand] = result
  }
  private rotate(...[operation, operand]: TZ80CBInstructionRotateProps) {
    const value = this.readOperand(operand)
    const carryIn = this.flag.hasFlag(Z80_FLAG.carry) ? 1 : 0
    let carry = false
    let result = value

    switch (operation) {
      case 'rlc':
        carry = (value & 0x80) !== 0
        result = (value << 1) | (carry ? 0x01 : 0)
        break
      case 'rrc':
        carry = (value & 0x01) !== 0
        result = (value >> 1) | (carry ? 0x80 : 0)
        break
      case 'rl':
        carry = (value & 0x80) !== 0
        result = (value << 1) | carryIn
        break
      case 'rr':
        carry = (value & 0x01) !== 0
        result = (value >> 1) | (carryIn << 7)
        break
      case 'sla':
        carry = (value & 0x80) !== 0
        result = value << 1
        break
      case 'sra':
        carry = (value & 0x01) !== 0
        result = (value >> 1) | (value & 0x80)
        break
      case 'srl':
        carry = (value & 0x01) !== 0
        result = value >> 1
        break
    }

    result = this.byte.toByte(result)
    this.writeOperand(operand, result)
    this.flag.updateSign(result)
    this.flag.updateZero(result)
    this.flag.set(Z80_FLAG.halfCarry, false)
    this.flag.updateParity(result)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, carry)

    return !operand ? Z80_CYCLES.cbModifyHL : Z80_CYCLES.cbRegister
  }
  private bit(...[bit, operand]: TZ80CBInstructionBitProps) {
    const value = this.readOperand(operand)
    const isSet = (value & (1 << bit)) !== 0

    this.flag.set(Z80_FLAG.sign, bit === 7 && isSet)
    this.flag.set(Z80_FLAG.zero, !isSet)
    this.flag.set(Z80_FLAG.halfCarry, true)
    this.flag.set(Z80_FLAG.parityOverflow, !isSet)
    this.flag.set(Z80_FLAG.subtract, false)

    return !operand ? Z80_CYCLES.cbBitHL : Z80_CYCLES.cbRegister
  }
  private reset(...[bit, operand]: TZ80CBInstructionResetProps) {
    this.writeOperand(operand, this.readOperand(operand) & ~(1 << bit))
    return !operand ? Z80_CYCLES.cbModifyHL : Z80_CYCLES.cbRegister
  }
  private set(...[bit, operand]: TZ80CBInstructionSetProps) {
    this.writeOperand(operand, this.readOperand(operand) | (1 << bit))
    return !operand ? Z80_CYCLES.cbModifyHL : Z80_CYCLES.cbRegister
  }
  private createHandlers() {
    const handlers: TZ80CBInstructionHandlers = {}

    for (let operationIndex = 0; operationIndex < Z80_CPU.rotateOperations.length; operationIndex += 1) {
      const operation = Z80_CPU.rotateOperations[operationIndex]
      if (operation === null) continue

      for (let operandIndex = 0; operandIndex < Z80_CPU.operands8.length; operandIndex += 1) {
        const operand = Z80_CPU.operands8[operandIndex]
        const opcode = (operationIndex << 3) | operandIndex

        handlers[opcode] = () => this.rotate(operation, operand)
      }
    }

    for (let bit = 0; bit < 8; bit += 1) {
      for (let operandIndex = 0; operandIndex < Z80_CPU.operands8.length; operandIndex += 1) {
        const operand = Z80_CPU.operands8[operandIndex]

        handlers[0x40 | (bit << 3) | operandIndex] = () => this.bit(bit, operand)
        handlers[0x80 | (bit << 3) | operandIndex] = () => this.reset(bit, operand)
        handlers[0xc0 | (bit << 3) | operandIndex] = () => this.set(bit, operand)
      }
    }

    return handlers
  }

  public executeOpcode(...[opcode, opcodePc]: TZ80CBInstructionExecuteOpcodeProps) {
    const byteOpcode = this.byte.toByte(opcode)
    const handler = this.handlers[byteOpcode]

    if (!handler) throw new Z80OpcodeNotImplementedError(byteOpcode, opcodePc || this.state.pc)

    return handler()
  }
}
