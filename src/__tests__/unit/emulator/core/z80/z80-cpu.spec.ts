import type { IZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'

import { Z80_CYCLES, Z80_MEMORY } from '_EMU/constants/z80'
import { Z80CPU } from '_EMU/core/z80/cpu'

import { Z80CPUExecutorMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-executor'
import { Z80CPU16Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu16'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80MemoryBusMock } from '_TEST/utils/stubs/emulator/z80/fake-memory-bus'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let state: Z80StateMock
let memoryBus: Z80MemoryBusMock

let cpu8: Z80CPU8Mock
let cpu16: IZ80CPU16
let executor: Z80CPUExecutorMock

let sut: Z80CPU

describe('Emulator', () => {
  beforeEach(() => {
    state = new Z80StateMock()

    memoryBus = new Z80MemoryBusMock(Z80_MEMORY.size)

    cpu8 = new Z80CPU8Mock(state, memoryBus)
    cpu16 = new Z80CPU16Mock(cpu8, state)
    executor = new Z80CPUExecutorMock()

    sut = new Z80CPU(state, cpu8, cpu16, executor)
  })

  describe('Core', () => {
    describe('Z80 CPU', () => {
      describe('Constructor', () => {
        it('should exposes the injected state', () => {
          expect(sut.state).toBe(state)
        })
        it('should exposes the 8-bit CPU operations', () => {
          expect(sut.read8).toBe(cpu8.read)
          expect(sut.fetch8).toBe(cpu8.fetch)
          expect(sut.write8).toBe(cpu8.write)
        })
        it('exposes the 16-bit CPU operations', () => {
          expect(sut.pop16).toBe(cpu16.pop)
          expect(sut.push16).toBe(cpu16.push)
          expect(sut.fetch16).toBe(cpu16.fetch)
        })
      })
      describe('Reset', () => {
        it('should delegates the reset to the CPU state', () => {
          sut.reset()

          expect(state.reset).toHaveBeenCalledOnce()
        })
      })
      describe('Step', () => {
        it('should returns the halt cycles without fetching or executing an opcode when halted', () => {
          state.halted = true

          const result = sut.step()

          expect(result).toBe(Z80_CYCLES.halt)
          expect(cpu16.fetch).not.toHaveBeenCalled()
          expect(executor.executeOpcode).not.toHaveBeenCalled()
        })
        it('should fetches, executes and returns the opcode cycle count', () => {
          cpu8.fetch.mockReturnValueOnce(0x3e)
          executor.executeOpcode.mockReturnValueOnce(7)

          const result = sut.step()

          expect(result).toBe(7)
          expect(cpu8.fetch).toHaveBeenCalledOnce()
          expect(executor.executeOpcode).toHaveBeenCalledOnce()
          expect(executor.executeOpcode).toHaveBeenCalledWith(0x3e, 0x0000)
        })
        it('should delegates the original program counter when executing an opcode', () => {
          state.pc = 0x1234
          cpu8.fetch.mockImplementationOnce(() => {
            state.pc += 1
            return 0xdd
          })
          executor.executeOpcode.mockReturnValueOnce(4)

          sut.step()

          expect(executor.executeOpcode).toHaveBeenCalledWith(0xdd, 0x1234)
        })
        it('should not mask internal opcode handler errors', () => {
          const handlerError = new Error('handler failed')
          cpu8.fetch.mockReturnValueOnce(0x80)
          executor.executeOpcode.mockImplementationOnce(() => {
            throw handlerError
          })

          expect(sut.step).toThrow(handlerError)
        })
      })
      describe('Request Interrupt', () => {
        it('should ignores the interrupt when maskable interrupts are disabled', () => {
          state.iff1 = false
          state.iff2 = true
          state.halted = true

          sut.requestInterrupt(0xff)

          expect(state.iff1).toBe(false)
          expect(state.iff2).toBe(true)
          expect(state.halted).toBe(true)
        })
        it('should disables interrupts and resumes the CPU when the interrupt is accepted', () => {
          state.iff1 = true
          state.iff2 = true
          state.halted = true

          sut.requestInterrupt(0xff)

          expect(state.iff1).toBe(false)
          expect(state.iff2).toBe(false)
          expect(state.halted).toBe(false)
        })
      })
    })
  })
})
