import type { TZ80StateData } from '@/emulator/core/z80/state'
import type {
  TEZ80CPUAluArithmeticOperation,
  TEZ80CPUAluLogicalOperation,
  TEZ80CPUAluOperation,
  TEZ80CPURegister8,
} from '@/enums/emulator/z80'

import { Z80_FLAG } from '_EMU/constants/z80'

import { Z80_CPU_ALU_ARITHMETIC_OPERATIONS, Z80_CPU_ALU_LOGICAL_OPERATIONS } from '_SRV/constant/emulator/z80'

export const Z80RegistersList = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  h: 'H',
  l: 'L',
} satisfies Record<TEZ80CPURegister8, string>
export const Z80RegistersPairs = Object.entries(Z80RegistersList) as [TEZ80CPURegister8, string][]

export const wordLoadCases = [
  { opcode: 0x01, expected: 'bc' },
  { opcode: 0x11, expected: 'de' },
  { opcode: 0x21, expected: 'hl' },
  { opcode: 0x31, expected: 'sp' },
] as const
export const incrementCases = [
  { opcode: 0x3c, expected: 'a' },
  { opcode: 0x04, expected: 'b' },
  { opcode: 0x0c, expected: 'c' },
  { opcode: 0x14, expected: 'd' },
  { opcode: 0x1c, expected: 'e' },
  { opcode: 0x24, expected: 'h' },
  { opcode: 0x2c, expected: 'l' },
] satisfies Array<{ opcode: number; expected: TEZ80CPURegister8 }>
export const decrementCases = [
  { opcode: 0x3d, expected: 'a' },
  { opcode: 0x05, expected: 'b' },
  { opcode: 0x0d, expected: 'c' },
  { opcode: 0x15, expected: 'd' },
  { opcode: 0x1d, expected: 'e' },
  { opcode: 0x25, expected: 'h' },
  { opcode: 0x2d, expected: 'l' },
] satisfies Array<{ opcode: number; expected: TEZ80CPURegister8 }>
export const immediateLoadCases = [
  { opcode: 0x3e, expected: 'a' },
  { opcode: 0x06, expected: 'b' },
  { opcode: 0x0e, expected: 'c' },
  { opcode: 0x16, expected: 'd' },
  { opcode: 0x1e, expected: 'e' },
  { opcode: 0x26, expected: 'h' },
  { opcode: 0x2e, expected: 'l' },
] satisfies Array<{ opcode: number; expected: TEZ80CPURegister8 }>

const preservedAccumulatorFlags = Z80_FLAG.sign | Z80_FLAG.zero | Z80_FLAG.parityOverflow

export const accumulatorRotationCases = [
  {
    name: 'RLCA with carry output',
    opcode: 0x07,
    value: 0x81,
    carryIn: false,
    expected: 0x03,
    carryOut: true,
    flags: preservedAccumulatorFlags,
  },
  {
    name: 'RLCA without carry output',
    opcode: 0x07,
    value: 0x02,
    carryIn: true,
    expected: 0x04,
    carryOut: false,
    flags: 0,
  },
  {
    name: 'RRCA with carry output',
    opcode: 0x0f,
    value: 0x81,
    carryIn: false,
    expected: 0xc0,
    carryOut: true,
    flags: preservedAccumulatorFlags,
  },
  {
    name: 'RRCA without carry output',
    opcode: 0x0f,
    value: 0x80,
    carryIn: true,
    expected: 0x40,
    carryOut: false,
    flags: 0,
  },
  {
    name: 'RLA with carry input and output',
    opcode: 0x17,
    value: 0x80,
    carryIn: true,
    expected: 0x01,
    carryOut: true,
    flags: preservedAccumulatorFlags,
  },
  {
    name: 'RLA without carry input or output',
    opcode: 0x17,
    value: 0x01,
    carryIn: false,
    expected: 0x02,
    carryOut: false,
    flags: 0,
  },
  {
    name: 'RRA with carry input and output',
    opcode: 0x1f,
    value: 0x01,
    carryIn: true,
    expected: 0x80,
    carryOut: true,
    flags: preservedAccumulatorFlags,
  },
  {
    name: 'RRA without carry input or output',
    opcode: 0x1f,
    value: 0x80,
    carryIn: false,
    expected: 0x40,
    carryOut: false,
    flags: 0,
  },
] as const

export const decimalAdjustAccumulatorCases = [
  {
    name: 'addition with 0x06 correction',
    value: 0x3c,
    flags: 0,
    expected: 0x42,
    expectedFlags: Z80_FLAG.halfCarry | Z80_FLAG.parityOverflow,
  },
  {
    name: 'addition with 0x60 correction',
    value: 0xa0,
    flags: 0,
    expected: 0x00,
    expectedFlags: Z80_FLAG.zero | Z80_FLAG.parityOverflow | Z80_FLAG.carry,
  },
  {
    name: 'addition with 0x66 correction',
    value: 0x9a,
    flags: 0,
    expected: 0x00,
    expectedFlags: Z80_FLAG.zero | Z80_FLAG.halfCarry | Z80_FLAG.parityOverflow | Z80_FLAG.carry,
  },
  {
    name: 'subtraction with half-borrow',
    value: 0x0f,
    flags: Z80_FLAG.subtract | Z80_FLAG.halfCarry,
    expected: 0x09,
    expectedFlags: Z80_FLAG.subtract | Z80_FLAG.parityOverflow,
  },
  {
    name: 'subtraction with borrow',
    value: 0xee,
    flags: Z80_FLAG.subtract | Z80_FLAG.halfCarry | Z80_FLAG.carry,
    expected: 0x88,
    expectedFlags: Z80_FLAG.sign | Z80_FLAG.parityOverflow | Z80_FLAG.subtract | Z80_FLAG.carry,
  },
] as const

export const byteConversionCases = [
  { value: 0x00, expected: 0 },
  { value: 0xff, expected: 255 },
  { value: 0x1ff, expected: 255 },
  { value: -1, expected: 255 },
] satisfies Array<{ value: number; expected: number }>

export const wordConversionCases = [
  { value: 0x0000, expected: 0x0000 },
  { value: 0xffff, expected: 65535 },
  { value: 0x1ffff, expected: 65535 },
  { value: -1, expected: 65535 },
] satisfies Array<{ value: number; expected: number }>

export const signedByteConversionCases = [
  { value: 0x00, expected: 0 },
  { value: 0x7f, expected: 127 },
  { value: 0x80, expected: -128 },
  { value: 0xff, expected: -1 },
  { value: 0x1ff, expected: -1 },
] satisfies Array<{ value: number; expected: number }>

export const parityCases = [
  { value: 0b00000000, expected: true },
  { value: 0b00000001, expected: false },
  { value: 0b00000011, expected: true },
  { value: 0b11111111, expected: true },
  { value: 0x101, expected: false },
] satisfies Array<{ value: number; expected: boolean }>

export const accessorValues = {
  a: 0x01,
  b: 0x02,
  c: 0x03,
  d: 0x04,
  e: 0x05,
  f: 0x06,
  h: 0x07,
  i: 0x08,
  l: 0x09,
  r: 0x0a,
  ix: 0x1234,
  iy: 0x2345,
  sp: 0x3456,
  pc: 0x4567,
  iff1: true,
  iff2: true,
  shadowA: 0x11,
  shadowB: 0x12,
  shadowC: 0x13,
  shadowD: 0x14,
  shadowE: 0x15,
  shadowF: 0x16,
  shadowH: 0x17,
  shadowL: 0x18,
  halted: true,
  interruptMode: 2,
} satisfies TZ80StateData

export const accessorCases = Object.entries(accessorValues).map(([property, value]) => ({
  property: property as keyof TZ80StateData,
  value,
}))

export const wordRegisterCases = [
  { register: 'af', high: 'a', low: 'f' },
  { register: 'bc', high: 'b', low: 'c' },
  { register: 'de', high: 'd', low: 'e' },
  { register: 'hl', high: 'h', low: 'l' },
] as const

export const registerOperands = [
  { offset: 0, register: 'b' },
  { offset: 1, register: 'c' },
  { offset: 2, register: 'd' },
  { offset: 3, register: 'e' },
  { offset: 4, register: 'h' },
  { offset: 5, register: 'l' },
  { offset: 6 },
  { offset: 7, register: 'a' },
] satisfies Array<{ offset: number; register?: TEZ80CPURegister8 }>

const registerOnlyOperands = registerOperands.filter(
  (operand): operand is { offset: number; register: TEZ80CPURegister8 } => operand.register !== undefined,
)

export const registerLoadCases = registerOnlyOperands.flatMap((destination) =>
  registerOnlyOperands.map((source) => ({
    destination: destination.register,
    opcode: 0x40 + destination.offset * 8 + source.offset,
    source: source.register,
  })),
)
export const registerFromHLLoadCases = registerOnlyOperands.map((destination) => ({
  destination: destination.register,
  opcode: 0x46 + destination.offset * 8,
}))
export const hlFromRegisterLoadCases = registerOnlyOperands.map((source) => ({
  opcode: 0x70 + source.offset,
  source: source.register,
}))
export const loadMemoryAtRegisterPairFromACases = [
  { opcode: 0x02, register: 'bc' },
  { opcode: 0x12, register: 'de' },
] as const
export const loadAFromMemoryAtRegisterPairCases = [
  { opcode: 0x0a, register: 'bc' },
  { opcode: 0x1a, register: 'de' },
] as const

export const increment16Cases = [
  { opcode: 0x03, register: 'bc' },
  { opcode: 0x13, register: 'de' },
  { opcode: 0x23, register: 'hl' },
  { opcode: 0x33, register: 'sp' },
] as const
export const decrement16Cases = [
  { opcode: 0x0b, register: 'bc' },
  { opcode: 0x1b, register: 'de' },
  { opcode: 0x2b, register: 'hl' },
  { opcode: 0x3b, register: 'sp' },
] as const
export const addHLRegisterPairCases = [
  { opcode: 0x09, register: 'bc' },
  { opcode: 0x19, register: 'de' },
  { opcode: 0x29, register: 'hl' },
  { opcode: 0x39, register: 'sp' },
] as const
export const stackRegisterPairCases = [
  { popOpcode: 0xc1, pushOpcode: 0xc5, register: 'bc' },
  { popOpcode: 0xd1, pushOpcode: 0xd5, register: 'de' },
  { popOpcode: 0xe1, pushOpcode: 0xe5, register: 'hl' },
  { popOpcode: 0xf1, pushOpcode: 0xf5, register: 'af' },
] as const

export const exchangeRegisterCases = [
  {
    opcode: 0x08,
    initial: { a: 0x12, f: 0x34, shadowA: 0x56, shadowF: 0x78 },
    expected: { a: 0x56, f: 0x78, shadowA: 0x12, shadowF: 0x34 },
  },
  {
    opcode: 0xd9,
    initial: {
      b: 0x10,
      c: 0x11,
      d: 0x20,
      e: 0x21,
      h: 0x30,
      l: 0x31,
      shadowB: 0x40,
      shadowC: 0x41,
      shadowD: 0x50,
      shadowE: 0x51,
      shadowH: 0x60,
      shadowL: 0x61,
    },
    expected: {
      b: 0x40,
      c: 0x41,
      d: 0x50,
      e: 0x51,
      h: 0x60,
      l: 0x61,
      shadowB: 0x10,
      shadowC: 0x11,
      shadowD: 0x20,
      shadowE: 0x21,
      shadowH: 0x30,
      shadowL: 0x31,
    },
  },
  {
    opcode: 0xeb,
    initial: { d: 0x12, e: 0x34, h: 0x56, l: 0x78 },
    expected: { d: 0x56, e: 0x78, h: 0x12, l: 0x34 },
  },
] as const

export const conditionalOpcodeCases = [
  { callOpcode: 0xc4, flag: Z80_FLAG.zero, jpOpcode: 0xc2, name: 'NZ', retOpcode: 0xc0, takenFlag: false },
  { callOpcode: 0xcc, flag: Z80_FLAG.zero, jpOpcode: 0xca, name: 'Z', retOpcode: 0xc8, takenFlag: true },
  { callOpcode: 0xd4, flag: Z80_FLAG.carry, jpOpcode: 0xd2, name: 'NC', retOpcode: 0xd0, takenFlag: false },
  { callOpcode: 0xdc, flag: Z80_FLAG.carry, jpOpcode: 0xda, name: 'C', retOpcode: 0xd8, takenFlag: true },
  {
    callOpcode: 0xe4,
    flag: Z80_FLAG.parityOverflow,
    jpOpcode: 0xe2,
    name: 'PO',
    retOpcode: 0xe0,
    takenFlag: false,
  },
  {
    callOpcode: 0xec,
    flag: Z80_FLAG.parityOverflow,
    jpOpcode: 0xea,
    name: 'PE',
    retOpcode: 0xe8,
    takenFlag: true,
  },
  { callOpcode: 0xf4, flag: Z80_FLAG.sign, jpOpcode: 0xf2, name: 'P', retOpcode: 0xf0, takenFlag: false },
  { callOpcode: 0xfc, flag: Z80_FLAG.sign, jpOpcode: 0xfa, name: 'M', retOpcode: 0xf8, takenFlag: true },
] as const

export const relativeConditionalOpcodeCases = [
  { flag: Z80_FLAG.zero, name: 'NZ', opcode: 0x20, takenFlag: false },
  { flag: Z80_FLAG.zero, name: 'Z', opcode: 0x28, takenFlag: true },
  { flag: Z80_FLAG.carry, name: 'NC', opcode: 0x30, takenFlag: false },
  { flag: Z80_FLAG.carry, name: 'C', opcode: 0x38, takenFlag: true },
] as const

export const relativeJumpCases = [
  { expected: 0x1005, offset: 0x05 },
  { expected: 0x0ffb, offset: 0xfb },
] as const

export const aluLogicOperations = [...Z80_CPU_ALU_LOGICAL_OPERATIONS] as const
export const aluArithmeticOperations = [...Z80_CPU_ALU_ARITHMETIC_OPERATIONS] as const

export const aluArithmeticOpcodeFamilies = [
  { base: 0x80, carry: false, immediate: 0xc6, operation: 'add' },
  { base: 0x88, carry: true, immediate: 0xce, operation: 'add' },
  { base: 0x90, carry: false, immediate: 0xd6, operation: 'sub' },
  { base: 0x98, carry: true, immediate: 0xde, operation: 'sub' },
] satisfies Array<{ base: number; carry: boolean; immediate: number; operation: TEZ80CPUAluArithmeticOperation }>

export const aluLogicOpcodeFamilies = [
  { base: 0xa0, immediate: 0xe6, operation: 'and' },
  { base: 0xa8, immediate: 0xee, operation: 'xor' },
  { base: 0xb0, immediate: 0xf6, operation: 'or' },
  { base: 0xb8, immediate: 0xfe, operation: 'cp' },
] satisfies Array<{ base: number; immediate: number; operation: TEZ80CPUAluLogicalOperation }>

export const aluArithmeticRegisterCases = aluArithmeticOpcodeFamilies.flatMap((family) =>
  registerOperands.flatMap((operand) =>
    operand.register ? [{ ...family, ...operand, opcode: family.base + operand.offset }] : [],
  ),
) satisfies Array<{
  base: number
  carry: boolean
  opcode: number
  offset: number
  immediate: number
  register: TEZ80CPURegister8
  operation: TEZ80CPUAluOperation
}>

export const aluLogicRegisterLoCases = aluLogicOpcodeFamilies.flatMap((family) =>
  registerOperands.flatMap((operand) =>
    operand.register ? [{ ...family, ...operand, opcode: family.base + operand.offset }] : [],
  ),
) satisfies Array<{
  base: number
  opcode: number
  offset: number
  immediate: number
  register: TEZ80CPURegister8
  operation: TEZ80CPUAluOperation
}>

export const aluArithmeticHLCases = aluArithmeticOpcodeFamilies.map((family) => ({
  ...family,
  opcode: family.base + 0x06,
})) satisfies Array<{
  base: number
  carry: boolean
  immediate: number
  opcode: number
  operation: TEZ80CPUAluOperation
}>

export const aluLogicHLCases = aluLogicOpcodeFamilies.map((family) => ({
  ...family,
  opcode: family.base + 0x06,
})) satisfies Array<{ base: number; immediate: number; opcode: number; operation: TEZ80CPUAluOperation }>

export const rstCases = [
  { opcode: 0xc7, expected: 0x00 },
  { opcode: 0xcf, expected: 0x08 },
  { opcode: 0xd7, expected: 0x10 },
  { opcode: 0xdf, expected: 0x18 },
  { opcode: 0xe7, expected: 0x20 },
  { opcode: 0xef, expected: 0x28 },
  { opcode: 0xf7, expected: 0x30 },
  { opcode: 0xff, expected: 0x38 },
] as const satisfies Array<{ opcode: number; expected: number }>
