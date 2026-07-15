import { Z80_FLAG } from '_EMU/constants/z80'
import { Z80Flag } from '_EMU/core/z80/flag'

import { parityCases } from '_TEST/utils/setup/emulator/z80'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let byte: Z80ByteMock
let state: Z80StateMock

let sut: Z80Flag

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    state = new Z80StateMock()

    sut = new Z80Flag(byte, state)
  })

  describe('Core', () => {
    describe('Z80 Flag', () => {
      describe('Has Flag', () => {
        it('should return true when the normalized flag is set', () => {
          state.f = Z80_FLAG.carry
          byte.toByte.mockReturnValueOnce(Z80_FLAG.carry)

          const result = sut.hasFlag(0x101)

          expect(result).toBe(true)
          expect(byte.toByte).toHaveBeenCalledWith(0x101)
        })
        it('should return false when the flag is not set', () => {
          state.f = Z80_FLAG.carry
          byte.toByte.mockReturnValueOnce(Z80_FLAG.zero)

          const result = sut.hasFlag(Z80_FLAG.zero)

          expect(result).toBe(false)
        })
      })
      describe('Set', () => {
        it('should enable a flag while preserving the existing flags', () => {
          state.f = Z80_FLAG.carry
          byte.toByte.mockReturnValueOnce(Z80_FLAG.sign).mockReturnValueOnce(Z80_FLAG.sign | Z80_FLAG.carry)

          sut.set(Z80_FLAG.sign, true)

          expect(state.f).toBe(Z80_FLAG.sign | Z80_FLAG.carry)
        })
        it('should disable a flag while preserving the existing flags', () => {
          state.f = Z80_FLAG.sign | Z80_FLAG.carry
          byte.toByte.mockReturnValueOnce(Z80_FLAG.sign).mockReturnValueOnce(Z80_FLAG.carry)

          sut.set(Z80_FLAG.sign, false)

          expect(state.f).toBe(Z80_FLAG.carry)
        })
        it('should normalize the flag and resulting flag register', () => {
          state.f = 0xff
          byte.toByte.mockReturnValueOnce(0x80).mockReturnValueOnce(0x7f)

          sut.set(0x180, false)

          expect(byte.toByte).toHaveBeenNthCalledWith(1, 0x180)
          expect(byte.toByte).toHaveBeenNthCalledWith(2, 0x7f)
          expect(state.f).toBe(0x7f)
        })
      })
      describe('Update Sign', () => {
        it('should set the sign flag when bit 7 is enabled', () => {
          byte.toByte
            .mockReturnValueOnce(0x80)
            .mockReturnValueOnce(Z80_FLAG.sign)
            .mockReturnValueOnce(Z80_FLAG.sign)
            .mockReturnValueOnce(Z80_FLAG.sign)

          sut.updateSign(0x80)

          const result = sut.hasFlag(Z80_FLAG.sign)

          expect(result).toBe(true)
        })
        it('should clear the sign flag when bit 7 is disabled', () => {
          state.f = Z80_FLAG.sign
          byte.toByte
            .mockReturnValueOnce(0x7f)
            .mockReturnValueOnce(Z80_FLAG.sign)
            .mockReturnValueOnce(0x00)
            .mockReturnValueOnce(Z80_FLAG.sign)

          sut.updateSign(0x7f)

          const result = sut.hasFlag(Z80_FLAG.sign)

          expect(result).toBe(false)
        })
      })
      describe('Update Zero', () => {
        it('should set the zero flag when the normalized value is zero', () => {
          byte.toByte
            .mockReturnValueOnce(0x00)
            .mockReturnValueOnce(Z80_FLAG.zero)
            .mockReturnValueOnce(Z80_FLAG.zero)
            .mockReturnValueOnce(Z80_FLAG.zero)

          sut.updateZero(0x100)

          const result = sut.hasFlag(Z80_FLAG.zero)

          expect(result).toBe(true)
        })
        it('should clear the zero flag when the normalized value is not zero', () => {
          state.f = Z80_FLAG.zero
          byte.toByte
            .mockReturnValueOnce(0x01)
            .mockReturnValueOnce(Z80_FLAG.zero)
            .mockReturnValueOnce(0x00)
            .mockReturnValueOnce(Z80_FLAG.zero)

          sut.updateZero(0x01)

          const result = sut.hasFlag(Z80_FLAG.zero)

          expect(result).toBe(false)
        })
      })
      describe('Update Parity', () => {
        it('should set the parity flag for an even number of enabled bits', () => {
          byte.toByte
            .mockReturnValueOnce(0b00000011)
            .mockReturnValueOnce(Z80_FLAG.parityOverflow)
            .mockReturnValueOnce(Z80_FLAG.parityOverflow)
            .mockReturnValueOnce(Z80_FLAG.parityOverflow)

          sut.updateParity(0b00000011)

          const result = sut.hasFlag(Z80_FLAG.parityOverflow)

          expect(result).toBe(true)
        })
        it('should clear the parity flag for an odd number of enabled bits', () => {
          state.f = Z80_FLAG.parityOverflow
          byte.toByte
            .mockReturnValueOnce(0b00000001)
            .mockReturnValueOnce(Z80_FLAG.parityOverflow)
            .mockReturnValueOnce(0x00)
            .mockReturnValueOnce(Z80_FLAG.parityOverflow)

          sut.updateParity(0b00000001)

          const result = sut.hasFlag(Z80_FLAG.parityOverflow)

          expect(result).toBe(false)
        })
      })
      describe('Calculate Parity', () => {
        it.each(parityCases)('should return $expected for $value', ({ value, expected }) => {
          byte.toByte.mockReturnValueOnce(value & 0xff)

          const result = sut.calculateParity(value)

          expect(result).toBe(expected)
        })
      })
    })
  })
})
