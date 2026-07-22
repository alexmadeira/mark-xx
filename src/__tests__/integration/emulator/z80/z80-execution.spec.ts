import { Z80_FLAG } from '_EMU/constants/z80'
import { ByteMemory } from '_EMU/core/value-object/byte-memory'
import { Z80TraceEntry } from '_EMU/core/value-object/z80-trace-entry'
import { Z80Byte } from '_EMU/core/z80/byte'
import { Z80CPU } from '_EMU/core/z80/cpu'
import { Z80CPUAlu } from '_EMU/core/z80/cpu/alu'
import { Z80CPU16 } from '_EMU/core/z80/cpu/cpu16'
import { Z80CPU8 } from '_EMU/core/z80/cpu/cpu8'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'
import { Z80CPURegister } from '_EMU/core/z80/cpu/register'
import { Z80Flag } from '_EMU/core/z80/flag'
import { Z80MemoryBus } from '_EMU/core/z80/memory-bus'
import { Z80State } from '_EMU/core/z80/state'

import { makeZ80Core } from '_TEST/utils/factories/emulator/z80/make-core'
import { makeZ80Runner } from '_TEST/utils/factories/emulator/z80/make-runner'

describe('Emulator', () => {
  describe('Z80 execution integration', () => {
    it('should execute register loads, addition and halt as a complete program', () => {
      const core = makeZ80Core({
        createCPU: Z80CPU.create,
        createAlu: Z80CPUAlu.create,
        createCPU8: Z80CPU8.create,
        createCPU16: Z80CPU16.create,
        createRegister: Z80CPURegister.create,
        createExecutor: Z80CPUExecutor.create,
        createByte: Z80Byte.create,
        createFlag: Z80Flag.create,
        createState: Z80State.create,
        createMemoryBus: Z80MemoryBus.create,
        createMemory: ByteMemory.create,
        memorySize: 0x10000,
        memory: [0x3e, 0x01, 0x06, 0x02, 0x80, 0x76],
      })
      const runner = makeZ80Runner({
        cpu: core.cpu,
        traceCreate: Z80TraceEntry.create,
      })

      runner.runInstructions(10)

      expect(core.state.a).toBe(0x03)
      expect(core.state.halted).toBe(true)
    })
    it('should execute a CB-prefixed instruction as part of a complete program', () => {
      const core = makeZ80Core({ memory: [0x06, 0x81, 0xcb, 0x00, 0x76] })
      const runner = makeZ80Runner({
        cpu: core.cpu,
        traceCreate: Z80TraceEntry.create,
      })

      const trace = runner.runInstructions(10)

      expect(trace.map((entry) => entry.pc)).toEqual([0x0000, 0x0002, 0x0004])
      expect(core.state.b).toBe(0x03)
      expect(core.state.f).toBe(Z80_FLAG.parityOverflow | Z80_FLAG.carry)
      expect(core.state.halted).toBe(true)
    })
    it('should push and restore the return address while executing CALL and RET', () => {
      const core = makeZ80Core({
        createCPU: Z80CPU.create,
        createAlu: Z80CPUAlu.create,
        createCPU8: Z80CPU8.create,
        createCPU16: Z80CPU16.create,
        createRegister: Z80CPURegister.create,
        createExecutor: Z80CPUExecutor.create,
        createByte: Z80Byte.create,
        createFlag: Z80Flag.create,
        createState: Z80State.create,
        createMemoryBus: Z80MemoryBus.create,
        createMemory: ByteMemory.create,
        memorySize: 0x10000,
        memory: [0xcd, 0x05, 0x00, 0x76, 0x00, 0xc9],
      })
      const runner = makeZ80Runner({
        cpu: core.cpu,
        traceCreate: Z80TraceEntry.create,
      })

      const callTrace = runner.step()

      expect(callTrace.pc).toBe(0x0000)
      expect(callTrace.opcode).toBe(0xcd)
      expect(callTrace.sp).toBe(0xfffd)
      expect(core.state.pc).toBe(0x0005)
      expect(core.state.sp).toBe(0xfffd)
      expect(core.memoryBus.read(0xfffd)).toBe(0x03)
      expect(core.memoryBus.read(0xfffe)).toBe(0x00)

      const returnTrace = runner.step()

      expect(returnTrace.pc).toBe(0x0005)
      expect(returnTrace.opcode).toBe(0xc9)
      expect(returnTrace.sp).toBe(0xffff)
      expect(core.state.pc).toBe(0x0003)
      expect(core.state.sp).toBe(0xffff)

      runner.step()

      expect(core.state.pc).toBe(0x0004)
      expect(core.state.halted).toBe(true)
    })

    it('should execute DJNZ until B reaches zero', () => {
      const core = makeZ80Core({
        createCPU: Z80CPU.create,
        createAlu: Z80CPUAlu.create,
        createCPU8: Z80CPU8.create,
        createCPU16: Z80CPU16.create,
        createRegister: Z80CPURegister.create,
        createExecutor: Z80CPUExecutor.create,
        createByte: Z80Byte.create,
        createFlag: Z80Flag.create,
        createState: Z80State.create,
        createMemoryBus: Z80MemoryBus.create,
        createMemory: ByteMemory.create,
        memorySize: 0x10000,
        memory: [0x3e, 0x05, 0x06, 0x03, 0x10, 0xfe, 0x76],
      })
      const runner = makeZ80Runner({
        cpu: core.cpu,
        traceCreate: Z80TraceEntry.create,
      })

      const trace = runner.runInstructions(10)
      const loopTrace = trace.filter((entry) => entry.pc === 0x0004)

      expect(core.state.a).toBe(0x05)
      expect(core.state.b).toBe(0x00)
      expect(loopTrace.map((entry) => entry.b)).toEqual([0x02, 0x01, 0x00])
      expect(trace.map((entry) => entry.pc)).toEqual([0x0000, 0x0002, 0x0004, 0x0004, 0x0004, 0x0006])
      expect(core.state.halted).toBe(true)
    })

    it('should store the accumulator in memory through HL', () => {
      const core = makeZ80Core({
        createCPU: Z80CPU.create,
        createAlu: Z80CPUAlu.create,
        createCPU8: Z80CPU8.create,
        createCPU16: Z80CPU16.create,
        createRegister: Z80CPURegister.create,
        createExecutor: Z80CPUExecutor.create,
        createByte: Z80Byte.create,
        createFlag: Z80Flag.create,
        createState: Z80State.create,
        createMemoryBus: Z80MemoryBus.create,
        createMemory: ByteMemory.create,
        memorySize: 0x10000,
        memory: [0x21, 0x00, 0x40, 0x3e, 0x0a, 0x77, 0x76],
      })
      const runner = makeZ80Runner({
        cpu: core.cpu,
        traceCreate: Z80TraceEntry.create,
      })

      runner.runInstructions(10)

      expect(core.state.hl).toBe(0x4000)
      expect(core.memoryBus.read(0x4000)).toBe(0x0a)
      expect(core.state.halted).toBe(true)
    })

    it('should take and skip a conditional JP according to flags produced by CP', () => {
      const runConditionalJump = (compareValue: number) => {
        const core = makeZ80Core({
          createCPU: Z80CPU.create,
          createAlu: Z80CPUAlu.create,
          createCPU8: Z80CPU8.create,
          createCPU16: Z80CPU16.create,
          createRegister: Z80CPURegister.create,
          createExecutor: Z80CPUExecutor.create,
          createByte: Z80Byte.create,
          createFlag: Z80Flag.create,
          createState: Z80State.create,
          createMemoryBus: Z80MemoryBus.create,
          createMemory: ByteMemory.create,
          memorySize: 0x10000,
          memory: [0x3e, 0x01, 0xfe, compareValue, 0xca, 0x0a, 0x00, 0x06, 0x11, 0x76, 0x06, 0x22, 0x76],
        })
        const runner = makeZ80Runner({
          cpu: core.cpu,
          traceCreate: Z80TraceEntry.create,
        })

        const trace = runner.runInstructions(10)

        return { core, runner, trace }
      }

      const taken = runConditionalJump(0x01)

      expect(taken.core.flag.hasFlag(Z80_FLAG.zero)).toBe(true)
      expect(taken.trace.map((entry) => entry.pc)).toEqual([0x0000, 0x0002, 0x0004, 0x000a, 0x000c])
      expect(taken.core.state.b).toBe(0x22)

      const notTaken = runConditionalJump(0x02)

      expect(notTaken.core.flag.hasFlag(Z80_FLAG.zero)).toBe(false)
      expect(notTaken.trace.map((entry) => entry.pc)).toEqual([0x0000, 0x0002, 0x0004, 0x0007, 0x0009])
      expect(notTaken.core.state.b).toBe(0x11)
    })
  })
})
