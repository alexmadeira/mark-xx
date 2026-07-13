// import type { TZ80CPURegister8 } from '@/emulator/core/z80/cpu/register'

import { Z80_CYCLES } from '_EMU/constants/z80'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'

import {
  decrementCases,
  immediateLoadCases,
  incrementCases,
  registerLoadCases,
  wordLoadCases,
} from '_TEST/utils/setup/emulator/z80'
import { Z80CPURegisterMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-register'
import { Z80CPU16Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu16'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let state: Z80StateMock
let cpu8: Z80CPU8Mock
let cpu16: Z80CPU16Mock
let register: Z80CPURegisterMock

let sut: Z80CPUExecutor

describe('Emulator', () => {
  beforeEach(() => {
    state = new Z80StateMock()
    cpu8 = new Z80CPU8Mock()
    cpu16 = new Z80CPU16Mock()
    register = new Z80CPURegisterMock()

    sut = new Z80CPUExecutor(state, cpu8, cpu16, register)
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
          expect(() => sut.executeOpcode(0xff)).toThrow('unsupported opcode')
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
    })
  })
})
