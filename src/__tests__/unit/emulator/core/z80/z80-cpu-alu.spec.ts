import { Z80_FLAG } from '_EMU/constants/z80'
import { Z80CPUAlu } from '_EMU/core/z80/cpu/alu'

import { aluLogicOperations } from '_TEST/utils/setup/emulator/z80'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80FlagMock } from '_TEST/utils/stubs/emulator/z80/fake-flag'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let flag: Z80FlagMock
let byte: Z80ByteMock
let state: Z80StateMock

let sut: Z80CPUAlu

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    flag = new Z80FlagMock()
    state = new Z80StateMock()

    sut = new Z80CPUAlu(state, flag, byte)
  })

  describe('Core', () => {
    describe('Z80 CPU ALU', () => {
      describe('ADD and ADC', () => {
        it('should add values and set half-carry without setting subtract', () => {
          state.a = 0x0f
          byte.toByte.mockReturnValueOnce(0x0f).mockReturnValueOnce(0x01).mockReturnValueOnce(0x10)

          sut.add(0x01)

          expect(state.a).toBe(0x10)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, false)
        })
        it('should set carry and zero when addition wraps to zero', () => {
          state.a = 0xff
          byte.toByte.mockReturnValueOnce(0xff).mockReturnValueOnce(0x01).mockReturnValueOnce(0x00)

          sut.add(0x01)

          expect(state.a).toBe(0x00)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.carry, true)
          expect(flag.updateZero).toHaveBeenCalledWith(0x00)
        })
        it('should set sign and signed overflow when adding positive values produces a negative result', () => {
          state.a = 0x7f
          byte.toByte.mockReturnValueOnce(0x7f).mockReturnValueOnce(0x01).mockReturnValueOnce(0x80)

          sut.add(0x01)

          expect(state.a).toBe(0x80)
          expect(flag.updateSign).toHaveBeenCalledWith(0x80)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, true)
        })
        it('should include the pre-existing carry for ADC', () => {
          state.a = 0x01
          flag.hasFlag.mockReturnValueOnce(true)
          byte.toByte.mockReturnValueOnce(0x01).mockReturnValueOnce(0x01).mockReturnValueOnce(0x03)

          sut.add(0x01, true)

          expect(flag.hasFlag).toHaveBeenCalledWith(Z80_FLAG.carry)
          expect(state.a).toBe(0x03)
        })
      })
      describe('SUB, SBC and CP', () => {
        it('should subtract values and set half-carry and subtract', () => {
          state.a = 0x10
          byte.toByte.mockReturnValueOnce(0x10).mockReturnValueOnce(0x01).mockReturnValueOnce(0x0f)

          sut.sub(0x01)

          expect(state.a).toBe(0x0f)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, true)
        })
        it('should set carry and sign when subtraction produces a negative result', () => {
          state.a = 0x00
          byte.toByte.mockReturnValueOnce(0x00).mockReturnValueOnce(0x01).mockReturnValueOnce(0xff)

          sut.sub(0x01)

          expect(state.a).toBe(0xff)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.carry, true)
          expect(flag.updateSign).toHaveBeenCalledWith(0xff)
        })
        it('should set signed overflow when subtracting a positive value wraps the sign', () => {
          state.a = 0x80
          byte.toByte.mockReturnValueOnce(0x80).mockReturnValueOnce(0x01).mockReturnValueOnce(0x7f)

          sut.sub(0x01)

          expect(state.a).toBe(0x7f)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, true)
        })
        it('should set zero when subtracting equal values', () => {
          state.a = 0x42
          byte.toByte.mockReturnValueOnce(0x42).mockReturnValueOnce(0x42).mockReturnValueOnce(0x00)

          sut.sub(0x42)

          expect(state.a).toBe(0x00)
          expect(flag.updateZero).toHaveBeenCalledWith(0x00)
        })
        it('should include the pre-existing carry for SBC', () => {
          state.a = 0x03
          flag.hasFlag.mockReturnValueOnce(true)
          byte.toByte.mockReturnValueOnce(0x03).mockReturnValueOnce(0x01).mockReturnValueOnce(0x01)

          sut.sub(0x01, true)

          expect(flag.hasFlag).toHaveBeenCalledWith(Z80_FLAG.carry)
          expect(state.a).toBe(0x01)
        })
        it('should compare values and update subtraction flags without changing A', () => {
          state.a = 0x80
          byte.toByte.mockReturnValueOnce(0x80).mockReturnValueOnce(0x01).mockReturnValueOnce(0x7f)

          sut.cp(0x01)

          expect(state.a).toBe(0x80)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, true)
        })
      })
      describe('Logical operations', () => {
        it.each(aluLogicOperations)('should normalize the operand before %s', (operation) => {
          state.a = 0x5a
          byte.toByte.mockReturnValue(0x00)

          sut[operation](0x13c)

          expect(byte.toByte).toHaveBeenCalledWith(0x13c)
        })
        it('should AND values and set half-carry and even parity', () => {
          state.a = 0xf0
          byte.toByte.mockReturnValueOnce(0x3c).mockReturnValueOnce(0x30)

          sut.and(0x3c)

          expect(state.a).toBe(0x30)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.updateParity).toHaveBeenCalledWith(0x30)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.carry, false)
        })
        it('should OR values and set sign with even parity', () => {
          state.a = 0x80
          byte.toByte.mockReturnValueOnce(0x01).mockReturnValueOnce(0x81)

          sut.or(0x01)

          expect(state.a).toBe(0x81)
          expect(flag.updateSign).toHaveBeenCalledWith(0x81)
          expect(flag.updateParity).toHaveBeenCalledWith(0x81)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, false)
        })
        it('should XOR equal values to zero and set zero and even parity', () => {
          state.a = 0xaa
          byte.toByte.mockReturnValueOnce(0xaa).mockReturnValueOnce(0x00)

          sut.xor(0xaa)

          expect(state.a).toBe(0x00)
          expect(flag.updateZero).toHaveBeenCalledWith(0x00)
          expect(flag.updateParity).toHaveBeenCalledWith(0x00)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, false)
        })
      })
    })
  })
})
