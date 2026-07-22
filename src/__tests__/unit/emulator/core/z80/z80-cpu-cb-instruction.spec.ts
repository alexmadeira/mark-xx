import { Z80_CYCLES, Z80_FLAG } from '_EMU/constants/z80'
import { Z80Byte } from '_EMU/core/z80/byte'
import { Z80CBInstruction } from '_EMU/core/z80/cpu/cb-instruction'
import { Z80OpcodeNotImplementedError } from '_EMU/core/z80/errors'
import { Z80Flag } from '_EMU/core/z80/flag'

import { cbRotationShiftCases } from '_TEST/utils/setup/emulator/z80'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let byte: Z80Byte
let flag: Z80Flag
let state: Z80StateMock
let cpu8: Z80CPU8Mock

let sut: Z80CBInstruction

describe('Emulator', () => {
  describe('Z80 CB Instruction', () => {
    beforeEach(() => {
      byte = new Z80Byte()
      state = new Z80StateMock()
      flag = new Z80Flag(byte, state)
      cpu8 = new Z80CPU8Mock(state)

      sut = new Z80CBInstruction(byte, cpu8, flag, state)
    })

    it('should expose handlers for all 248 documented CB opcodes', () => {
      let executedHandlers = 0

      for (let opcode = 0x00; opcode <= 0xff; opcode += 1) {
        if (opcode >= 0x30 && opcode <= 0x37) continue

        expect(() => sut.executeOpcode(opcode)).not.toThrow()
        executedHandlers += 1
      }

      expect(executedHandlers).toBe(248)
    })

    describe('Register operands', () => {
      it('should execute CB 00 as RLC B', () => {
        state.b = 0x81
        state.f = Z80_FLAG.halfCarry | Z80_FLAG.subtract

        const cycles = sut.executeOpcode(0x00)

        expect(cycles).toBe(Z80_CYCLES.cbRegister)
        expect(state.b).toBe(0x03)
        expect(state.f).toBe(Z80_FLAG.parityOverflow | Z80_FLAG.carry)
      })

      it('should execute CB 40 as BIT 0,B while preserving carry', () => {
        state.b = 0x00
        state.f = Z80_FLAG.sign | Z80_FLAG.carry

        const cycles = sut.executeOpcode(0x40)

        expect(cycles).toBe(Z80_CYCLES.cbRegister)
        expect(state.b).toBe(0x00)
        expect(state.f).toBe(Z80_FLAG.zero | Z80_FLAG.halfCarry | Z80_FLAG.parityOverflow | Z80_FLAG.carry)
      })

      it('should execute CB 80 as RES 0,B without changing flags', () => {
        const preservedFlags =
          Z80_FLAG.sign |
          Z80_FLAG.zero |
          Z80_FLAG.halfCarry |
          Z80_FLAG.parityOverflow |
          Z80_FLAG.subtract |
          Z80_FLAG.carry
        state.b = 0xff
        state.f = preservedFlags

        const cycles = sut.executeOpcode(0x80)

        expect(cycles).toBe(Z80_CYCLES.cbRegister)
        expect(state.b).toBe(0xfe)
        expect(state.f).toBe(preservedFlags)
      })

      it('should execute CB C0 as SET 0,B without changing flags', () => {
        const preservedFlags = Z80_FLAG.sign | Z80_FLAG.zero | Z80_FLAG.carry
        state.b = 0x00
        state.f = preservedFlags

        const cycles = sut.executeOpcode(0xc0)

        expect(cycles).toBe(Z80_CYCLES.cbRegister)
        expect(state.b).toBe(0x01)
        expect(state.f).toBe(preservedFlags)
      })

      it.each(cbRotationShiftCases)(
        'should execute $name and update result flags',
        ({ opcode, value, carryIn, expected, flags }) => {
          state.b = value
          state.f =
            Z80_FLAG.sign |
            Z80_FLAG.zero |
            Z80_FLAG.halfCarry |
            Z80_FLAG.parityOverflow |
            Z80_FLAG.subtract |
            (carryIn ? Z80_FLAG.carry : 0)

          const cycles = sut.executeOpcode(opcode)

          expect(cycles).toBe(Z80_CYCLES.cbRegister)
          expect(state.b).toBe(expected)
          expect(state.f).toBe(flags)
        },
      )

      it('should set sign only when BIT tests a set bit 7', () => {
        state.b = 0x80
        state.f = Z80_FLAG.carry

        sut.executeOpcode(0x78)

        expect(state.f).toBe(Z80_FLAG.sign | Z80_FLAG.halfCarry | Z80_FLAG.carry)
      })

      it('should reject the undocumented SLL family', () => {
        const execute = () => sut.executeOpcode(0x30, 0x1234)

        expect(execute).toThrow(new Z80OpcodeNotImplementedError(0x30, 0x1234))
      })
    })

    describe('(HL) operand', () => {
      beforeEach(() => {
        state.hl = 0x4000
      })

      it('should rotate the byte at HL and use memory timing', () => {
        cpu8.read.mockReturnValueOnce(0x80)

        const cycles = sut.executeOpcode(0x06)

        expect(cycles).toBe(Z80_CYCLES.cbModifyHL)
        expect(cpu8.read).toHaveBeenCalledWith(0x4000)
        expect(cpu8.write).toHaveBeenCalledWith(0x4000, 0x01)
        expect(state.f).toBe(Z80_FLAG.carry)
      })

      it('should test the byte at HL without writing it', () => {
        cpu8.read.mockReturnValueOnce(0x00)
        state.f = Z80_FLAG.carry

        const cycles = sut.executeOpcode(0x46)

        expect(cycles).toBe(Z80_CYCLES.cbBitHL)
        expect(cpu8.read).toHaveBeenCalledWith(0x4000)
        expect(cpu8.write).not.toHaveBeenCalled()
        expect(state.f).toBe(Z80_FLAG.zero | Z80_FLAG.halfCarry | Z80_FLAG.parityOverflow | Z80_FLAG.carry)
      })

      it('should reset a bit at HL without changing flags', () => {
        cpu8.read.mockReturnValueOnce(0xff)
        state.f = Z80_FLAG.sign | Z80_FLAG.carry

        const cycles = sut.executeOpcode(0x86)

        expect(cycles).toBe(Z80_CYCLES.cbModifyHL)
        expect(cpu8.read).toHaveBeenCalledWith(0x4000)
        expect(cpu8.write).toHaveBeenCalledWith(0x4000, 0xfe)
        expect(state.f).toBe(Z80_FLAG.sign | Z80_FLAG.carry)
      })

      it('should set a bit at HL without changing flags', () => {
        cpu8.read.mockReturnValueOnce(0x00)
        state.f = Z80_FLAG.zero | Z80_FLAG.subtract

        const cycles = sut.executeOpcode(0xc6)

        expect(cycles).toBe(Z80_CYCLES.cbModifyHL)
        expect(cpu8.read).toHaveBeenCalledWith(0x4000)
        expect(cpu8.write).toHaveBeenCalledWith(0x4000, 0x01)
        expect(state.f).toBe(Z80_FLAG.zero | Z80_FLAG.subtract)
      })
    })
  })
})
