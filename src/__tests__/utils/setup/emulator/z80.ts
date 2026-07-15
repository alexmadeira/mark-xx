import type { TZ80StateData } from '@/emulator/core/z80/state'
import type { TEZ80CPUAluOpration, TEZ80CPURegister8 } from '@/enums/emulator/z80'

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
export const registerLoadCases = [
  { opcode: 0x78, expected: 'a', source: 'b' },
  { opcode: 0x79, expected: 'a', source: 'c' },
  { opcode: 0x7a, expected: 'a', source: 'd' },
  { opcode: 0x7b, expected: 'a', source: 'e' },
  { opcode: 0x7c, expected: 'a', source: 'h' },
  { opcode: 0x7d, expected: 'a', source: 'l' },
  { opcode: 0x47, expected: 'b', source: 'a' },
  { opcode: 0x4f, expected: 'c', source: 'a' },
  { opcode: 0x57, expected: 'd', source: 'a' },
  { opcode: 0x5f, expected: 'e', source: 'a' },
  { opcode: 0x67, expected: 'h', source: 'a' },
  { opcode: 0x6f, expected: 'l', source: 'a' },
] satisfies Array<{ opcode: number; expected: TEZ80CPURegister8; source: TEZ80CPURegister8 }>
export const immediateLoadCases = [
  { opcode: 0x3e, expected: 'a' },
  { opcode: 0x06, expected: 'b' },
  { opcode: 0x0e, expected: 'c' },
  { opcode: 0x16, expected: 'd' },
  { opcode: 0x1e, expected: 'e' },
  { opcode: 0x26, expected: 'h' },
  { opcode: 0x2e, expected: 'l' },
] satisfies Array<{ opcode: number; expected: TEZ80CPURegister8 }>

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

export const aluArithmeticOpcodeFamilies = [
  { base: 0x80, carry: false, immediate: 0xc6, operation: 'add' },
  { base: 0x88, carry: true, immediate: 0xce, operation: 'add' },
  { base: 0x90, carry: false, immediate: 0xd6, operation: 'sub' },
  { base: 0x98, carry: true, immediate: 0xde, operation: 'sub' },
] satisfies Array<{ base: number; carry: boolean; immediate: number; operation: TEZ80CPUAluOpration }>

export const aluLogicOpcodeFamilies = [
  { base: 0xa0, immediate: 0xe6, operation: 'and' },
  { base: 0xa8, immediate: 0xee, operation: 'xor' },
  { base: 0xb0, immediate: 0xf6, operation: 'or' },
  { base: 0xb8, immediate: 0xfe, operation: 'cp' },
] satisfies Array<{ base: number; immediate: number; operation: TEZ80CPUAluOpration }>

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
  operation: TEZ80CPUAluOpration
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
  operation: TEZ80CPUAluOpration
}>

export const aluArithmeticHLCases = aluArithmeticOpcodeFamilies.map((family) => ({
  ...family,
  opcode: family.base + 0x06,
})) satisfies Array<{ base: number; carry: boolean; immediate: number; opcode: number; operation: TEZ80CPUAluOpration }>

export const aluLogicHLCases = aluLogicOpcodeFamilies.map((family) => ({
  ...family,
  opcode: family.base + 0x06,
})) satisfies Array<{ base: number; immediate: number; opcode: number; operation: TEZ80CPUAluOpration }>
