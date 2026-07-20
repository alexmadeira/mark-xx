import type { TZ80TraceEntryCreate } from '@/emulator/core/value-object/z80-trace-entry'

import { Z80Runner } from '_EMU/core/z80/z80-runner'

import { Z80CPUMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'
import { Z80TraceEntryMock } from '_TEST/utils/stubs/emulator/z80/fake-trace-entry'

let cpu: Z80CPUMock
let state: Z80StateMock
let traceCreate: TZ80TraceEntryCreate

let sut: Z80Runner

describe('Emulator', () => {
  beforeEach(() => {
    state = new Z80StateMock()
    cpu = new Z80CPUMock(state)
    traceCreate = Z80TraceEntryMock.create

    sut = new Z80Runner(cpu, traceCreate)
  })

  describe('Core', () => {
    describe('Z80 Runner', () => {
      describe('Step', () => {
        it('should trace the pre-execution PC and opcode with the post-execution registers', () => {
          state.pc = 0x1234
          state.sp = 0xabcd
          cpu.read8.mockReturnValueOnce(0x3e)
          cpu.step.mockImplementationOnce(() => {
            state.a = 0x01
            state.f = 0x02
            state.b = 0x03
            state.c = 0x04
            state.d = 0x05
            state.e = 0x06
            state.h = 0x07
            state.l = 0x08
            state.sp = 0x9abc
            state.pc = 0x1235

            return 7
          })

          sut.step()

          expect(cpu.read8).toHaveBeenCalledOnce()
          expect(cpu.read8).toHaveBeenCalledWith(0x1234)
          expect(cpu.step).toHaveBeenCalledOnce()
          expect(traceCreate).toHaveBeenCalledWith({
            a: 0x01,
            f: 0x02,
            b: 0x03,
            c: 0x04,
            d: 0x05,
            e: 0x06,
            h: 0x07,
            l: 0x08,
            sp: 0x9abc,
            pc: 0x1234,
            cycles: 7,
            opcode: 0x3e,
          })
        })
      })

      describe('Run Cycles', () => {
        it('should finish the instruction that exceeds the remaining cycle budget', () => {
          Z80TraceEntryMock.create.mockClear()
          cpu.step.mockReturnValue(4)

          const trace = sut.runCycles(10)

          expect(trace).toHaveLength(3)
          expect(cpu.step).toHaveBeenCalledTimes(3)
          expect(traceCreate).toHaveBeenCalledTimes(3)
          expect(trace.map((entry) => entry.cycles)).toEqual([4, 4, 4])
        })
        it('should not execute instructions when the cycle budget is not positive', () => {
          expect(sut.runCycles(0)).toEqual([])
          expect(sut.runCycles(-1)).toEqual([])
          expect(cpu.step).not.toHaveBeenCalled()
        })
        it('should stop after an instruction halts the CPU', () => {
          cpu.step.mockImplementationOnce(() => {
            state.halted = true
            return 4
          })

          const trace = sut.runCycles(20)

          expect(trace).toHaveLength(1)
          expect(cpu.step).toHaveBeenCalledOnce()
        })
      })
      describe('Run Instructions', () => {
        it('should execute the floored instruction limit', () => {
          Z80TraceEntryMock.create.mockClear()
          const trace = sut.runInstructions(2.9)

          expect(trace).toHaveLength(2)
          expect(cpu.step).toHaveBeenCalledTimes(2)
          expect(traceCreate).toHaveBeenCalledTimes(2)
        })
        it('should not execute instructions when the limit is not positive', () => {
          expect(sut.runInstructions(0)).toEqual([])
          expect(sut.runInstructions(-1)).toEqual([])
          expect(cpu.step).not.toHaveBeenCalled()
        })
        it('should stop after an instruction halts the CPU', () => {
          cpu.step.mockImplementationOnce(() => {
            state.halted = true

            return 4
          })

          const trace = sut.runInstructions(5)

          expect(trace).toHaveLength(1)
          expect(cpu.step).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
