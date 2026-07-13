import { Z80_FLAG } from '_EMU/constants/z80'
import { Z80CPURegister } from '_EMU/core/z80/cpu/register'

import { Z80RegistersPairs } from '_TEST/utils/setup/emulator/z80'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80FlagMock } from '_TEST/utils/stubs/emulator/z80/fake-flag'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let byte: Z80ByteMock
let flag: Z80FlagMock
let state: Z80StateMock

let sut: Z80CPURegister

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    state = new Z80StateMock()
    flag = new Z80FlagMock(state)

    sut = new Z80CPURegister(state, flag, byte)
  })

  describe('Core', () => {
    describe('Z80 CPU Register', () => {
      describe('Increment', () => {
        it.each(Z80RegistersPairs)('should increment and normalize the $1 register', (register) => {
          state[register] = 0x42

          sut.increment(register)
          expect(byte.toByte).toHaveBeenCalledWith(0x43)
          expect(state[register]).toBe(0x43)
        })
        it('should update sign, zero, half-carry, overflow and subtract flags', () => {
          state.a = 0x42

          sut.increment('a')

          expect(flag.updateSign).toHaveBeenCalledWith(0x43)
          expect(flag.updateZero).toHaveBeenCalledWith(0x43)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, false)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, false)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, false)
        })
        it('should set half-carry and overflow when incrementing 0x7f', () => {
          state.a = 0x7f

          sut.increment('a')

          expect(state.a).toBe(0x80)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, true)
        })
        it('should wrap 0xff to zero and update the zero flag', () => {
          state.a = 0xff

          sut.increment('a')

          expect(state.a).toBe(0x00)
          expect(flag.updateZero).toHaveBeenCalledWith(0x00)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, false)
        })
      })

      describe('Decrement', () => {
        it.each(Z80RegistersPairs)('should decrement and normalize the $1 register', (register) => {
          state[register] = 0x42

          sut.decrement(register)

          expect(byte.toByte).toHaveBeenCalledWith(0x41)
          expect(state[register]).toBe(0x41)
        })
        it('should update sign, zero, half-carry, overflow and subtract flags', () => {
          state.a = 0x42

          sut.decrement('a')

          expect(flag.updateSign).toHaveBeenCalledWith(0x41)
          expect(flag.updateZero).toHaveBeenCalledWith(0x41)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, false)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, false)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, true)
        })
        it('should set half-carry and overflow when decrementing 0x80', () => {
          state.a = 0x80

          sut.decrement('a')

          expect(state.a).toBe(0x7f)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, true)
        })
        it('should wrap zero to 0xff and update the sign flag', () => {
          state.a = 0x00

          sut.decrement('a')

          expect(state.a).toBe(0xff)
          expect(flag.updateSign).toHaveBeenCalledWith(0xff)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.parityOverflow, false)
        })
        it('should set zero without half-carry when decrementing one', () => {
          state.a = 0x01

          sut.decrement('a')

          expect(state.a).toBe(0x00)
          expect(flag.updateZero).toHaveBeenCalledWith(0x00)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, false)
        })
      })
    })
  })
})
