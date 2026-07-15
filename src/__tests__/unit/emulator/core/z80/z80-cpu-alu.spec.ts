import { Z80_FLAG } from '_EMU/constants/z80'
import { Z80CPUAlu } from '_EMU/core/z80/cpu/alu'

import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80FlagMock } from '_TEST/utils/stubs/emulator/z80/fake-flag'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let state: Z80StateMock
let flag: Z80FlagMock
let byte: Z80ByteMock
let sut: Z80CPUAlu

function hasFlag(value: number): boolean {
  return (state.f & value) !== 0
}

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    state = new Z80StateMock()
    flag = new Z80FlagMock(state)

    sut = new Z80CPUAlu(state, flag, byte)
  })

  describe('Core', () => {
    describe('Z80 CPU ALU', () => {
      describe('ADD and ADC', () => {
        it('should add values and set half-carry without setting subtract', () => {
          state.a = 0x0f

          sut.add(0x01)

          expect(state.a).toBe(0x10)
          expect(hasFlag(Z80_FLAG.halfCarry)).toBe(true)
          expect(hasFlag(Z80_FLAG.subtract)).toBe(false)
        })
        it('should set carry and zero when addition wraps to zero', () => {
          state.a = 0xff

          sut.add(0x01)

          expect(state.a).toBe(0x00)
          expect(hasFlag(Z80_FLAG.carry)).toBe(true)
          expect(hasFlag(Z80_FLAG.zero)).toBe(true)
        })
        it('should set sign and signed overflow when adding positive values produces a negative result', () => {
          state.a = 0x7f

          sut.add(0x01)

          expect(state.a).toBe(0x80)
          expect(hasFlag(Z80_FLAG.sign)).toBe(true)
          expect(hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
        })
        it('should include the pre-existing carry for ADC', () => {
          state.a = 0x01
          state.f = Z80_FLAG.carry

          sut.add(0x01, true)

          expect(state.a).toBe(0x03)
        })
      })
      describe('SUB, SBC and CP', () => {
        it('should subtract values and set half-carry and subtract', () => {
          state.a = 0x10

          sut.sub(0x01)

          expect(state.a).toBe(0x0f)
          expect(hasFlag(Z80_FLAG.halfCarry)).toBe(true)
          expect(hasFlag(Z80_FLAG.subtract)).toBe(true)
        })
        it('should set carry and sign when subtraction produces a negative result', () => {
          state.a = 0x00

          sut.sub(0x01)

          expect(state.a).toBe(0xff)
          expect(hasFlag(Z80_FLAG.carry)).toBe(true)
          expect(hasFlag(Z80_FLAG.sign)).toBe(true)
        })
        it('should set signed overflow when subtracting a positive value wraps the sign', () => {
          state.a = 0x80

          sut.sub(0x01)

          expect(state.a).toBe(0x7f)
          expect(hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
        })
        it('should set zero when subtracting equal values', () => {
          state.a = 0x42

          sut.sub(0x42)

          expect(state.a).toBe(0x00)
          expect(hasFlag(Z80_FLAG.zero)).toBe(true)
        })
        it('should include the pre-existing carry for SBC', () => {
          state.a = 0x03
          state.f = Z80_FLAG.carry

          sut.sub(0x01, true)

          expect(state.a).toBe(0x01)
        })
        it('should compare values and update subtraction flags without changing A', () => {
          state.a = 0x80

          sut.cp(0x01)

          expect(state.a).toBe(0x80)
          expect(hasFlag(Z80_FLAG.subtract)).toBe(true)
          expect(hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
        })
      })
      describe('Logical operations', () => {
        it('should AND values and set half-carry and even parity', () => {
          state.a = 0xf0

          sut.and(0x3c)

          expect(state.a).toBe(0x30)
          expect(hasFlag(Z80_FLAG.halfCarry)).toBe(true)
          expect(hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
          expect(hasFlag(Z80_FLAG.carry)).toBe(false)
        })
        it('should OR values and set sign with even parity', () => {
          state.a = 0x80

          sut.or(0x01)

          expect(state.a).toBe(0x81)
          expect(hasFlag(Z80_FLAG.sign)).toBe(true)
          expect(hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
          expect(hasFlag(Z80_FLAG.halfCarry)).toBe(false)
        })
        it('should XOR equal values to zero and set zero and even parity', () => {
          state.a = 0xaa

          sut.xor(0xaa)

          expect(state.a).toBe(0x00)
          expect(flag.hasFlag(Z80_FLAG.zero)).toBe(true)
          expect(flag.hasFlag(Z80_FLAG.parityOverflow)).toBe(true)
          expect(flag.hasFlag(Z80_FLAG.subtract)).toBe(false)
        })
      })
    })
  })
})
