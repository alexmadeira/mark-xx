import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type { IZ80CPUAlu } from '@/emulator/core/z80/cpu/alu'
import type { IZ80CBInstruction } from '@/emulator/core/z80/cpu/cb-instruction'
import type { IZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type {
  IZ80CPUExecutor,
  TZ80CPUExecutorAluHLProps,
  TZ80CPUExecutorAluImmediateProps,
  TZ80CPUExecutorAluRegisterProps,
  TZ80CPUExecutorExecuteAluProps,
  TZ80CPUExecutorExecuteOpcodeProps,
  TZ80CPUExecutorHandlers,
  TZ80CPUExecutorLoad8Props,
  TZ80CPUExecutorLoadImmediate8Props,
  TZ80CPUExecutorLoadImmediate16Props,
  TZ80CPUExecutorLoadMemoryAtRegisterPairFromAProps,
  TZ80CPUExecutorLoadAFromMemoryAtRegisterPairProps,
  TZ80CPUExecutorIncrement8Props,
  TZ80CPUExecutorDecrement8Props,
  TZ80CPUExecutorIncrement16Props,
  TZ80CPUExecutorDecrement16Props,
  TZ80CPUExecutorAddHLProps,
  TZ80CPUExecutorPushProps,
  TZ80CPUExecutorPopProps,
  TZ80CPUExecutorCreateProps,
} from '@/emulator/core/z80/cpu/executor'
import type { IZ80CPURegister } from '@/emulator/core/z80/cpu/register'
import type { IZ80Flag } from '@/emulator/core/z80/flags'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_CPU, Z80_CYCLES, Z80_FLAG } from '_EMU/constants/z80'

import { Z80OpcodeNotImplementedError } from '../errors'

export class Z80CPUExecutor implements IZ80CPUExecutor {
  private readonly handlers: TZ80CPUExecutorHandlers

  constructor(
    private readonly alu: IZ80CPUAlu,
    private readonly byte: IZ80Byte,
    private readonly cbInstruction: IZ80CBInstruction,
    private readonly flag: IZ80Flag,
    private readonly cpu8: IZ80CPU8,
    private readonly cpu16: IZ80CPU16,
    private readonly state: IZ80State,
    private readonly register: IZ80CPURegister,
  ) {
    this.handlers = this.createHandlers()
  }

  static create(props: TZ80CPUExecutorCreateProps) {
    return new Z80CPUExecutor(
      props.alu,
      props.byte,
      props.cbInstruction,
      props.flag,
      props.cpu8,
      props.cpu16,
      props.state,
      props.register,
    )
  }

  private aluHL(...[operation, carry = false]: TZ80CPUExecutorAluHLProps) {
    this.executeAlu(operation, this.cpu8.read(this.state.hl), carry)
    return Z80_CYCLES.aluHL
  }
  private executeAlu(...[operation, value, carry = false]: TZ80CPUExecutorExecuteAluProps) {
    if (operation === 'add' || operation === 'sub') {
      this.alu[operation](value, carry)
      return
    }

    this.alu[operation](value)
  }
  private aluRegister(...[operation, register, carry = false]: TZ80CPUExecutorAluRegisterProps) {
    this.executeAlu(operation, this.state[register], carry)
    return Z80_CYCLES.aluR
  }
  private aluImmediate(...[operation, carry = false]: TZ80CPUExecutorAluImmediateProps) {
    this.executeAlu(operation, this.cpu8.fetch(), carry)
    return Z80_CYCLES.aluN
  }

  private nop() {
    return Z80_CYCLES.nop
  }
  private halt() {
    this.state.halted = true
    return Z80_CYCLES.halt
  }
  private executeCBInstruction() {
    const opcodePc = this.state.pc
    const opcode = this.cpu8.fetch()

    return this.cbInstruction.executeOpcode(opcode, opcodePc)
  }
  private disableInterrupts() {
    this.state.iff1 = false
    this.state.iff2 = false
    return Z80_CYCLES.diEi
  }
  private enableInterrupts() {
    this.state.iff1 = true
    this.state.iff2 = true
    return Z80_CYCLES.diEi
  }
  private restart(address: number) {
    this.cpu16.push(this.state.pc)
    this.state.pc = address
    return Z80_CYCLES.rst
  }

  private updateAccumulatorRotationFlags(carry: boolean) {
    this.flag.set(Z80_FLAG.halfCarry, false)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, carry)
  }
  private rotateAccumulatorLeftCircular() {
    const value = this.byte.toByte(this.state.a)
    const carry = (value & 0x80) !== 0

    this.state.a = this.byte.toByte((value << 1) | (carry ? 0x01 : 0))
    this.updateAccumulatorRotationFlags(carry)

    return Z80_CYCLES.rotateAccumulator
  }
  private rotateAccumulatorRightCircular() {
    const value = this.byte.toByte(this.state.a)
    const carry = (value & 0x01) !== 0

    this.state.a = this.byte.toByte((value >> 1) | (carry ? 0x80 : 0))
    this.updateAccumulatorRotationFlags(carry)

    return Z80_CYCLES.rotateAccumulator
  }
  private rotateAccumulatorLeftThroughCarry() {
    const value = this.byte.toByte(this.state.a)
    const carryIn = this.flag.hasFlag(Z80_FLAG.carry)
    const carryOut = (value & 0x80) !== 0

    this.state.a = this.byte.toByte((value << 1) | (carryIn ? 0x01 : 0))
    this.updateAccumulatorRotationFlags(carryOut)

    return Z80_CYCLES.rotateAccumulator
  }
  private rotateAccumulatorRightThroughCarry() {
    const value = this.byte.toByte(this.state.a)
    const carryIn = this.flag.hasFlag(Z80_FLAG.carry)
    const carryOut = (value & 0x01) !== 0

    this.state.a = this.byte.toByte((value >> 1) | (carryIn ? 0x80 : 0))
    this.updateAccumulatorRotationFlags(carryOut)

    return Z80_CYCLES.rotateAccumulator
  }

  private decimalAdjustAccumulator() {
    const value = this.byte.toByte(this.state.a)
    const subtract = this.flag.hasFlag(Z80_FLAG.subtract)
    const halfCarry = this.flag.hasFlag(Z80_FLAG.halfCarry)
    const carry = this.flag.hasFlag(Z80_FLAG.carry)
    let correction = 0
    let carryAfter = carry

    if (halfCarry || (!subtract && (value & 0x0f) > 0x09)) correction |= 0x06
    if (carry || (!subtract && value > 0x99)) {
      correction |= 0x60
      carryAfter = true
    }

    const result = this.byte.toByte(subtract ? value - correction : value + correction)

    this.state.a = result
    this.flag.updateSign(result)
    this.flag.updateZero(result)
    this.flag.set(Z80_FLAG.halfCarry, ((value ^ result) & Z80_FLAG.halfCarry) !== 0)
    this.flag.updateParity(result)
    this.flag.set(Z80_FLAG.carry, carryAfter)

    return Z80_CYCLES.flagControl
  }
  private complementAccumulator() {
    this.state.a = this.byte.toByte(~this.state.a)
    this.flag.set(Z80_FLAG.halfCarry, true)
    this.flag.set(Z80_FLAG.subtract, true)
    return Z80_CYCLES.flagControl
  }
  private setCarryFlag() {
    this.flag.set(Z80_FLAG.halfCarry, false)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, true)
    return Z80_CYCLES.flagControl
  }
  private complementCarryFlag() {
    const carry = this.flag.hasFlag(Z80_FLAG.carry)

    this.flag.set(Z80_FLAG.halfCarry, carry)
    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.carry, !carry)
    return Z80_CYCLES.flagControl
  }

  private exchangeAF() {
    const a = this.state.a
    const f = this.state.f

    this.state.a = this.state.shadowA
    this.state.f = this.state.shadowF
    this.state.shadowA = a
    this.state.shadowF = f

    return Z80_CYCLES.exchangeRegister
  }
  private exchangeRegisterPairs() {
    const b = this.state.b
    const c = this.state.c
    const d = this.state.d
    const e = this.state.e
    const h = this.state.h
    const l = this.state.l

    this.state.b = this.state.shadowB
    this.state.c = this.state.shadowC
    this.state.d = this.state.shadowD
    this.state.e = this.state.shadowE
    this.state.h = this.state.shadowH
    this.state.l = this.state.shadowL
    this.state.shadowB = b
    this.state.shadowC = c
    this.state.shadowD = d
    this.state.shadowE = e
    this.state.shadowH = h
    this.state.shadowL = l

    return Z80_CYCLES.exchangeRegister
  }
  private exchangeDEAndHL() {
    const de = this.state.de

    this.state.de = this.state.hl
    this.state.hl = de
    return Z80_CYCLES.exchangeRegister
  }
  private exchangeStackAndHL() {
    const highAddress = this.byte.toWord(this.state.sp + 1)
    const low = this.cpu8.read(this.state.sp)
    const high = this.cpu8.read(highAddress)
    const hl = this.state.hl

    this.cpu8.write(this.state.sp, this.byte.getLowByte(hl))
    this.cpu8.write(highAddress, this.byte.getHighByte(hl))
    this.state.hl = this.byte.makeWord(low, high)

    return Z80_CYCLES.exchangeStackHL
  }
  private loadSPFromHL() {
    this.state.sp = this.state.hl
    return Z80_CYCLES.ldSPFromHL
  }

  private load8(...[destination, source]: TZ80CPUExecutorLoad8Props) {
    const value = source === null ? this.cpu8.read(this.state.hl) : this.state[source]

    if (destination === null) {
      this.cpu8.write(this.state.hl, value)
      return Z80_CYCLES.ldMemoryHLFromRegister
    }

    this.state[destination] = value
    return source === null ? Z80_CYCLES.ldRegisterFromMemoryHL : Z80_CYCLES.ldRR
  }
  private loadImmediate8(...[destination]: TZ80CPUExecutorLoadImmediate8Props) {
    const value = this.cpu8.fetch()

    if (destination === null) {
      this.cpu8.write(this.state.hl, value)
      return Z80_CYCLES.ldMemoryHLImmediate
    }

    this.state[destination] = value
    return Z80_CYCLES.ldRN
  }
  private loadImmediate16(...[register]: TZ80CPUExecutorLoadImmediate16Props) {
    this.state[register] = this.cpu16.fetch()
    return Z80_CYCLES.ldRRNN
  }
  private loadMemoryAtRegisterPairFromA(...[register]: TZ80CPUExecutorLoadMemoryAtRegisterPairFromAProps) {
    this.cpu8.write(this.state[register], this.state.a)
    return Z80_CYCLES.ldMemoryAtRegisterPairFromA
  }
  private loadAFromMemoryAtRegisterPair(...[register]: TZ80CPUExecutorLoadAFromMemoryAtRegisterPairProps) {
    this.state.a = this.cpu8.read(this.state[register])
    return Z80_CYCLES.ldAFromMemoryAtRegisterPair
  }
  private loadAbsoluteMemoryFromHL() {
    const address = this.cpu16.fetch()

    this.cpu8.write(address, this.byte.getLowByte(this.state.hl))
    this.cpu8.write(this.byte.toWord(address + 1), this.byte.getHighByte(this.state.hl))

    return Z80_CYCLES.ldAbsoluteMemoryFromHL
  }
  private loadHLFromAbsoluteMemory() {
    const address = this.cpu16.fetch()
    const low = this.cpu8.read(address)
    const high = this.cpu8.read(this.byte.toWord(address + 1))

    this.state.hl = this.byte.makeWord(low, high)
    return Z80_CYCLES.ldHLFromAbsoluteMemory
  }
  private loadAbsoluteMemoryFromA() {
    this.cpu8.write(this.cpu16.fetch(), this.state.a)
    return Z80_CYCLES.ldAbsoluteMemoryFromA
  }
  private loadAFromAbsoluteMemory() {
    this.state.a = this.cpu8.read(this.cpu16.fetch())
    return Z80_CYCLES.ldAFromAbsoluteMemory
  }

  private increment8(...[register]: TZ80CPUExecutorIncrement8Props) {
    this.register.increment(register)
    return Z80_CYCLES.incDecR
  }
  private decrement8(...[register]: TZ80CPUExecutorDecrement8Props) {
    this.register.decrement(register)
    return Z80_CYCLES.incDecR
  }
  private increment16(...[register]: TZ80CPUExecutorIncrement16Props) {
    this.state[register] = this.byte.toWord(this.state[register] + 1)
    return Z80_CYCLES.incDecRegister16
  }
  private decrement16(...[register]: TZ80CPUExecutorDecrement16Props) {
    this.state[register] = this.byte.toWord(this.state[register] - 1)
    return Z80_CYCLES.incDecRegister16
  }
  private addHL(...[register]: TZ80CPUExecutorAddHLProps) {
    const left = this.byte.toWord(this.state.hl)
    const right = this.byte.toWord(this.state[register])
    const result = left + right

    this.flag.set(Z80_FLAG.subtract, false)
    this.flag.set(Z80_FLAG.halfCarry, (left & 0x0fff) + (right & 0x0fff) > 0x0fff)
    this.flag.set(Z80_FLAG.carry, result > 0xffff)
    this.state.hl = this.byte.toWord(result)

    return Z80_CYCLES.addHLRegisterPair
  }

  private push(...[register]: TZ80CPUExecutorPushProps) {
    this.cpu16.push(this.state[register])
    return Z80_CYCLES.pushRegisterPair
  }
  private pop(...[register]: TZ80CPUExecutorPopProps) {
    this.state[register] = this.cpu16.pop()
    return Z80_CYCLES.popRegisterPair
  }

  private conditionNZ() {
    return !this.flag.hasFlag(Z80_FLAG.zero)
  }
  private conditionZ() {
    return this.flag.hasFlag(Z80_FLAG.zero)
  }
  private conditionNC() {
    return !this.flag.hasFlag(Z80_FLAG.carry)
  }
  private conditionC() {
    return this.flag.hasFlag(Z80_FLAG.carry)
  }
  private conditionPO() {
    return !this.flag.hasFlag(Z80_FLAG.parityOverflow)
  }
  private conditionPE() {
    return this.flag.hasFlag(Z80_FLAG.parityOverflow)
  }
  private conditionP() {
    return !this.flag.hasFlag(Z80_FLAG.sign)
  }
  private conditionM() {
    return this.flag.hasFlag(Z80_FLAG.sign)
  }

  private jumpAbsolute() {
    this.state.pc = this.cpu16.fetch()
    return Z80_CYCLES.jpNN
  }
  private jumpConditional(condition: boolean) {
    const address = this.cpu16.fetch()

    if (condition) this.state.pc = address
    return Z80_CYCLES.jpConditional
  }
  private callAbsolute() {
    const address = this.cpu16.fetch()

    this.cpu16.push(this.state.pc)
    this.state.pc = address

    return Z80_CYCLES.callNN
  }
  private callConditional(condition: boolean) {
    const address = this.cpu16.fetch()

    if (!condition) return Z80_CYCLES.callConditionalNotTaken

    this.cpu16.push(this.state.pc)
    this.state.pc = address
    return Z80_CYCLES.callConditionalTaken
  }
  private ret() {
    this.state.pc = this.cpu16.pop()
    return Z80_CYCLES.ret
  }
  private retConditional(condition: boolean) {
    if (!condition) return Z80_CYCLES.retConditionalNotTaken

    this.state.pc = this.cpu16.pop()
    return Z80_CYCLES.retConditionalTaken
  }
  private applyRelativeOffset(offset: number) {
    this.state.pc = this.byte.toWord(this.state.pc + this.byte.signedByte(offset))
  }
  private jumpRelative() {
    this.applyRelativeOffset(this.cpu8.fetch())
    return Z80_CYCLES.jr
  }
  private jumpRelativeConditional(condition: boolean) {
    const offset = this.cpu8.fetch()

    if (!condition) return Z80_CYCLES.jrConditionalNotTaken

    this.applyRelativeOffset(offset)
    return Z80_CYCLES.jrConditionalTaken
  }
  private decrementBAndJumpRelative() {
    const offset = this.cpu8.fetch()

    this.state.b = this.byte.toByte(this.state.b - 1)
    if (this.state.b === 0) return Z80_CYCLES.djnzNotTaken

    this.applyRelativeOffset(offset)
    return Z80_CYCLES.djnzTaken
  }

  private createHandlers() {
    const handlers: TZ80CPUExecutorHandlers = {
      0x00: () => this.nop(),
      0x76: () => this.halt(),
      0xcb: () => this.executeCBInstruction(),
      0xf3: () => this.disableInterrupts(),
      0xfb: () => this.enableInterrupts(),

      0xc7: () => this.restart(0x00),
      0xcf: () => this.restart(0x08),
      0xd7: () => this.restart(0x10),
      0xdf: () => this.restart(0x18),
      0xe7: () => this.restart(0x20),
      0xef: () => this.restart(0x28),
      0xf7: () => this.restart(0x30),
      0xff: () => this.restart(0x38),

      0x07: () => this.rotateAccumulatorLeftCircular(),
      0x0f: () => this.rotateAccumulatorRightCircular(),
      0x17: () => this.rotateAccumulatorLeftThroughCarry(),
      0x1f: () => this.rotateAccumulatorRightThroughCarry(),

      0x27: () => this.decimalAdjustAccumulator(),
      0x2f: () => this.complementAccumulator(),
      0x37: () => this.setCarryFlag(),
      0x3f: () => this.complementCarryFlag(),

      0x08: () => this.exchangeAF(),
      0xd9: () => this.exchangeRegisterPairs(),
      0xeb: () => this.exchangeDEAndHL(),
      0xe3: () => this.exchangeStackAndHL(),
      0xf9: () => this.loadSPFromHL(),

      0x3e: () => this.loadImmediate8('a'),
      0x06: () => this.loadImmediate8('b'),
      0x0e: () => this.loadImmediate8('c'),
      0x16: () => this.loadImmediate8('d'),
      0x1e: () => this.loadImmediate8('e'),
      0x26: () => this.loadImmediate8('h'),
      0x2e: () => this.loadImmediate8('l'),
      0x36: () => this.loadImmediate8(null),

      0x01: () => this.loadImmediate16('bc'),
      0x11: () => this.loadImmediate16('de'),
      0x21: () => this.loadImmediate16('hl'),
      0x31: () => this.loadImmediate16('sp'),

      0x02: () => this.loadMemoryAtRegisterPairFromA('bc'),
      0x12: () => this.loadMemoryAtRegisterPairFromA('de'),
      0x0a: () => this.loadAFromMemoryAtRegisterPair('bc'),
      0x1a: () => this.loadAFromMemoryAtRegisterPair('de'),
      0x22: () => this.loadAbsoluteMemoryFromHL(),
      0x2a: () => this.loadHLFromAbsoluteMemory(),
      0x32: () => this.loadAbsoluteMemoryFromA(),
      0x3a: () => this.loadAFromAbsoluteMemory(),

      0x3c: () => this.increment8('a'),
      0x04: () => this.increment8('b'),
      0x0c: () => this.increment8('c'),
      0x14: () => this.increment8('d'),
      0x1c: () => this.increment8('e'),
      0x24: () => this.increment8('h'),
      0x2c: () => this.increment8('l'),
      0x3d: () => this.decrement8('a'),
      0x05: () => this.decrement8('b'),
      0x0d: () => this.decrement8('c'),
      0x15: () => this.decrement8('d'),
      0x1d: () => this.decrement8('e'),
      0x25: () => this.decrement8('h'),
      0x2d: () => this.decrement8('l'),

      0x03: () => this.increment16('bc'),
      0x13: () => this.increment16('de'),
      0x23: () => this.increment16('hl'),
      0x33: () => this.increment16('sp'),
      0x0b: () => this.decrement16('bc'),
      0x1b: () => this.decrement16('de'),
      0x2b: () => this.decrement16('hl'),
      0x3b: () => this.decrement16('sp'),
      0x09: () => this.addHL('bc'),
      0x19: () => this.addHL('de'),
      0x29: () => this.addHL('hl'),
      0x39: () => this.addHL('sp'),

      0xc5: () => this.push('bc'),
      0xd5: () => this.push('de'),
      0xe5: () => this.push('hl'),
      0xf5: () => this.push('af'),
      0xc1: () => this.pop('bc'),
      0xd1: () => this.pop('de'),
      0xe1: () => this.pop('hl'),
      0xf1: () => this.pop('af'),

      0xc3: () => this.jumpAbsolute(),
      0xc2: () => this.jumpConditional(this.conditionNZ()),
      0xca: () => this.jumpConditional(this.conditionZ()),
      0xd2: () => this.jumpConditional(this.conditionNC()),
      0xda: () => this.jumpConditional(this.conditionC()),
      0xe2: () => this.jumpConditional(this.conditionPO()),
      0xea: () => this.jumpConditional(this.conditionPE()),
      0xf2: () => this.jumpConditional(this.conditionP()),
      0xfa: () => this.jumpConditional(this.conditionM()),

      0xcd: () => this.callAbsolute(),
      0xc4: () => this.callConditional(this.conditionNZ()),
      0xcc: () => this.callConditional(this.conditionZ()),
      0xd4: () => this.callConditional(this.conditionNC()),
      0xdc: () => this.callConditional(this.conditionC()),
      0xe4: () => this.callConditional(this.conditionPO()),
      0xec: () => this.callConditional(this.conditionPE()),
      0xf4: () => this.callConditional(this.conditionP()),
      0xfc: () => this.callConditional(this.conditionM()),

      0xc9: () => this.ret(),
      0xc0: () => this.retConditional(this.conditionNZ()),
      0xc8: () => this.retConditional(this.conditionZ()),
      0xd0: () => this.retConditional(this.conditionNC()),
      0xd8: () => this.retConditional(this.conditionC()),
      0xe0: () => this.retConditional(this.conditionPO()),
      0xe8: () => this.retConditional(this.conditionPE()),
      0xf0: () => this.retConditional(this.conditionP()),
      0xf8: () => this.retConditional(this.conditionM()),

      0x18: () => this.jumpRelative(),
      0x20: () => this.jumpRelativeConditional(this.conditionNZ()),
      0x28: () => this.jumpRelativeConditional(this.conditionZ()),
      0x30: () => this.jumpRelativeConditional(this.conditionNC()),
      0x38: () => this.jumpRelativeConditional(this.conditionC()),
      0x10: () => this.decrementBAndJumpRelative(),

      0x80: () => this.aluRegister('add', 'b'),
      0x81: () => this.aluRegister('add', 'c'),
      0x82: () => this.aluRegister('add', 'd'),
      0x83: () => this.aluRegister('add', 'e'),
      0x84: () => this.aluRegister('add', 'h'),
      0x85: () => this.aluRegister('add', 'l'),
      0x86: () => this.aluHL('add'),
      0x87: () => this.aluRegister('add', 'a'),
      0xc6: () => this.aluImmediate('add'),

      0x88: () => this.aluRegister('add', 'b', true),
      0x89: () => this.aluRegister('add', 'c', true),
      0x8a: () => this.aluRegister('add', 'd', true),
      0x8b: () => this.aluRegister('add', 'e', true),
      0x8c: () => this.aluRegister('add', 'h', true),
      0x8d: () => this.aluRegister('add', 'l', true),
      0x8e: () => this.aluHL('add', true),
      0x8f: () => this.aluRegister('add', 'a', true),
      0xce: () => this.aluImmediate('add', true),

      0x90: () => this.aluRegister('sub', 'b'),
      0x91: () => this.aluRegister('sub', 'c'),
      0x92: () => this.aluRegister('sub', 'd'),
      0x93: () => this.aluRegister('sub', 'e'),
      0x94: () => this.aluRegister('sub', 'h'),
      0x95: () => this.aluRegister('sub', 'l'),
      0x96: () => this.aluHL('sub'),
      0x97: () => this.aluRegister('sub', 'a'),
      0xd6: () => this.aluImmediate('sub'),

      0x98: () => this.aluRegister('sub', 'b', true),
      0x99: () => this.aluRegister('sub', 'c', true),
      0x9a: () => this.aluRegister('sub', 'd', true),
      0x9b: () => this.aluRegister('sub', 'e', true),
      0x9c: () => this.aluRegister('sub', 'h', true),
      0x9d: () => this.aluRegister('sub', 'l', true),
      0x9e: () => this.aluHL('sub', true),
      0x9f: () => this.aluRegister('sub', 'a', true),
      0xde: () => this.aluImmediate('sub', true),

      0xa0: () => this.aluRegister('and', 'b'),
      0xa1: () => this.aluRegister('and', 'c'),
      0xa2: () => this.aluRegister('and', 'd'),
      0xa3: () => this.aluRegister('and', 'e'),
      0xa4: () => this.aluRegister('and', 'h'),
      0xa5: () => this.aluRegister('and', 'l'),
      0xa6: () => this.aluHL('and'),
      0xa7: () => this.aluRegister('and', 'a'),
      0xe6: () => this.aluImmediate('and'),

      0xa8: () => this.aluRegister('xor', 'b'),
      0xa9: () => this.aluRegister('xor', 'c'),
      0xaa: () => this.aluRegister('xor', 'd'),
      0xab: () => this.aluRegister('xor', 'e'),
      0xac: () => this.aluRegister('xor', 'h'),
      0xad: () => this.aluRegister('xor', 'l'),
      0xae: () => this.aluHL('xor'),
      0xaf: () => this.aluRegister('xor', 'a'),
      0xee: () => this.aluImmediate('xor'),

      0xb0: () => this.aluRegister('or', 'b'),
      0xb1: () => this.aluRegister('or', 'c'),
      0xb2: () => this.aluRegister('or', 'd'),
      0xb3: () => this.aluRegister('or', 'e'),
      0xb4: () => this.aluRegister('or', 'h'),
      0xb5: () => this.aluRegister('or', 'l'),
      0xb6: () => this.aluHL('or'),
      0xb7: () => this.aluRegister('or', 'a'),
      0xf6: () => this.aluImmediate('or'),

      0xb8: () => this.aluRegister('cp', 'b'),
      0xb9: () => this.aluRegister('cp', 'c'),
      0xba: () => this.aluRegister('cp', 'd'),
      0xbb: () => this.aluRegister('cp', 'e'),
      0xbc: () => this.aluRegister('cp', 'h'),
      0xbd: () => this.aluRegister('cp', 'l'),
      0xbe: () => this.aluHL('cp'),
      0xbf: () => this.aluRegister('cp', 'a'),
      0xfe: () => this.aluImmediate('cp'),
    }

    for (let opcode = 0x40; opcode <= 0x7f; opcode += 1) {
      if (opcode === 0x76) continue

      const destination = Z80_CPU.operands8[(opcode >> 3) & 0x07]
      const source = Z80_CPU.operands8[opcode & 0x07]

      handlers[opcode] = () => this.load8(destination, source)
    }

    return handlers
  }

  public executeOpcode(...[opcode, opcodePc]: TZ80CPUExecutorExecuteOpcodeProps) {
    const handler = this.handlers[opcode]

    if (!handler) throw new Z80OpcodeNotImplementedError(opcode, opcodePc || this.state.pc)

    return handler()
  }
}
