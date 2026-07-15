import { Z80_CYCLES } from '_EMU/constants/z80'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'
import { Z80OpcodeNotImplementedError } from '_EMU/core/z80/errors'

import {
  decrementCases,
  immediateLoadCases,
  incrementCases,
  registerLoadCases,
  wordLoadCases,
  aluArithmeticHLCases,
  aluArithmeticRegisterCases,
  aluLogicRegisterLoCases,
  aluLogicHLCases,
  aluArithmeticOpcodeFamilies,
  aluLogicOpcodeFamilies,
} from '_TEST/utils/setup/emulator/z80'
import { Z80CPUAluMock } from '_TEST/utils/stubs/emulator/z80/fake-alu'
import { Z80CPURegisterMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-register'
import { Z80CPU16Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu16'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let alu: Z80CPUAluMock
let cpu8: Z80CPU8Mock
let cpu16: Z80CPU16Mock
let state: Z80StateMock
let register: Z80CPURegisterMock

let sut: Z80CPUExecutor

describe('Emulator', () => {
  beforeEach(() => {
    alu = new Z80CPUAluMock()
    cpu8 = new Z80CPU8Mock()
    cpu16 = new Z80CPU16Mock()
    state = new Z80StateMock()
    register = new Z80CPURegisterMock()

    sut = new Z80CPUExecutor(alu, cpu8, cpu16, state, register)
  })

  describe('Core', () => {
    describe('Z80 CPU Executor', () => {
      describe('Control', () => {
        it('should execute NOP', () => {
          const result = sut.executeOpcode(0x00)

          expect(result).toBe(Z80_CYCLES.nop)
        })
        it('should halt the CPU', () => {
          const result = sut.executeOpcode(0x76)

          expect(result).toBe(Z80_CYCLES.halt)
          expect(state.halted).toBe(true)
        })
        it('should reject an unsupported opcode', () => {
          state.pc = 0x1234

          expect(() => sut.executeOpcode(0xff, 0x1233)).toThrow(new Z80OpcodeNotImplementedError(0xff, 0x1233))
        })
      })
      describe('8-bit loads', () => {
        it.each(registerLoadCases)(
          'should execute opcode $opcode by loading $source into $expected',
          ({ opcode, expected, source }) => {
            state[source] = 0x42
            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRR)
            expect(state[expected]).toBe(0x42)
          },
        )
        it.each(immediateLoadCases)(
          'should execute opcode $opcode by loading an immediate value into $register',
          ({ opcode, expected }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(state[expected]).toBe(0x42)
          },
        )
        it('should load A from the address in HL', () => {
          state.hl = 0x1234
          cpu8.read.mockReturnValueOnce(0x42)

          const result = sut.executeOpcode(0x7e)

          expect(result).toBe(Z80_CYCLES.ldAHL)
          expect(cpu8.read).toHaveBeenCalledWith(0x1234)
          expect(state.a).toBe(0x42)
        })
        it('should write A to the address in HL', () => {
          state.hl = 0x1234
          state.a = 0x42

          const result = sut.executeOpcode(0x77)

          expect(result).toBe(Z80_CYCLES.ldHLA)
          expect(cpu8.write).toHaveBeenCalledWith(0x1234, 0x42)
        })
      })
      describe('16-bit loads', () => {
        it.each(wordLoadCases)(
          'should execute opcode $opcode by loading an immediate word into $register',
          ({ opcode, expected }) => {
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRRNN)
            expect(cpu16.fetch).toHaveBeenCalledOnce()
            expect(state[expected]).toBe(0x1234)
          },
        )
      })
      describe('Program flow', () => {
        it('should jump to an immediate address', () => {
          cpu16.fetch.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xc3)

          expect(result).toBe(Z80_CYCLES.jpNN)
          expect(state.pc).toBe(0x1234)
        })
        it('should call an immediate address and push the return address', () => {
          state.pc = 0x5678
          cpu16.fetch.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xcd)

          expect(result).toBe(Z80_CYCLES.callNN)
          expect(cpu16.push).toHaveBeenCalledWith(0x5678)
          expect(state.pc).toBe(0x1234)
        })
        it('should return to the address popped from the stack', () => {
          cpu16.pop.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xc9)

          expect(result).toBe(Z80_CYCLES.ret)
          expect(cpu16.pop).toHaveBeenCalledOnce()
          expect(state.pc).toBe(0x1234)
        })
      })
      describe('Register arithmetic', () => {
        it.each(incrementCases)('should execute opcode $opcode by incrementing $register', ({ opcode, expected }) => {
          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.incDecR)
          expect(register.increment).toHaveBeenCalledWith(expected)
        })
        it.each(decrementCases)('should execute opcode $opcode by decrementing $register', ({ opcode, expected }) => {
          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.incDecR)
          expect(register.decrement).toHaveBeenCalledWith(expected)
        })
      })
      describe('ALU operations', () => {
        it.each(aluArithmeticRegisterCases)(
          'should execute arithmetic $operation with register $register for opcode $opcode',
          ({ opcode, operation, register, carry }) => {
            state[register] = 0x42
            const result = sut.executeOpcode(opcode)
            expect(result).toBe(Z80_CYCLES.aluR)
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicRegisterLoCases)(
          'should execute logic $operation with register $register for opcode $opcode',
          ({ opcode, operation, register }) => {
            state[register] = 0x42
            const result = sut.executeOpcode(opcode)
            expect(result).toBe(Z80_CYCLES.aluR)
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
        it.each(aluArithmeticHLCases)(
          'should execute arithmetic $operation with the value at HL for opcode $opcode',
          ({ opcode, operation, carry }) => {
            state.hl = 0x1234
            cpu8.read.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.aluHL)
            expect(cpu8.read).toHaveBeenCalledWith(0x1234)
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicHLCases)(
          'should execute logic $operation with the value at HL for opcode $opcode',
          ({ opcode, operation }) => {
            state.hl = 0x1234
            cpu8.read.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.aluHL)
            expect(cpu8.read).toHaveBeenCalledWith(0x1234)
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
        it.each(aluArithmeticOpcodeFamilies)(
          'should execute arithmetic immediate $operation for opcode $immediate',
          ({ immediate, operation, carry }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(immediate)

            expect(result).toBe(Z80_CYCLES.aluN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicOpcodeFamilies)(
          'should execute logic immediate $operation for opcode $immediate',
          ({ immediate, operation }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(immediate)

            expect(result).toBe(Z80_CYCLES.aluN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
      })
    })
  })
})
