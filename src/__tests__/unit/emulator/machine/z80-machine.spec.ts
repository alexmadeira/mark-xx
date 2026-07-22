import { Z80Machine } from '_EMU/machine/z80-machine'

import { Z80CPUMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu'
import { Z80MemoryBusMock } from '_TEST/utils/stubs/emulator/z80/fake-memory-bus'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let cpu: Z80CPUMock
let memoryBus: Z80MemoryBusMock
let state: Z80StateMock

let sut: Z80Machine

describe('Emulator', () => {
  beforeEach(() => {
    state = new Z80StateMock()
    memoryBus = new Z80MemoryBusMock()
    cpu = new Z80CPUMock(state)

    sut = new Z80Machine(cpu, memoryBus, 10)
  })

  describe('Machine', () => {
    describe('Z80 Machine', () => {
      describe('Constructor', () => {
        it('should expose the injected CPU and memory bus', () => {
          expect(sut.cpu).toBe(cpu)
          expect(sut.memoryBus).toBe(memoryBus)
        })
        it('should create a machine from props', () => {
          const machine = Z80Machine.create({ cpu, memoryBus, cyclesPerFrame: 10 })

          expect(machine).toBeInstanceOf(Z80Machine)
          expect(machine.cpu).toBe(cpu)
          expect(machine.memoryBus).toBe(memoryBus)
        })
      })
      describe('Step', () => {
        it('should delegate execution to the CPU and return the consumed cycles', () => {
          cpu.step.mockReturnValueOnce(7)

          const cycles = sut.step()

          expect(cycles).toBe(7)
          expect(cpu.step).toHaveBeenCalledOnce()
        })
      })
      describe('Run Frame', () => {
        it('should execute instructions until the frame cycle budget is consumed', () => {
          cpu.step.mockReturnValue(5)

          sut.runFrame()

          expect(cpu.step).toHaveBeenCalledTimes(2)
        })
        it('should compensate instruction cycle overflow in the next frame', () => {
          cpu.step.mockReturnValue(4)

          sut.runFrame()

          expect(cpu.step).toHaveBeenCalledTimes(3)

          sut.runFrame()

          expect(cpu.step).toHaveBeenCalledTimes(5)
        })
        it('should normalize a fractional cycle budget', () => {
          sut = new Z80Machine(cpu, memoryBus, 8.9)
          cpu.step.mockReturnValue(4)

          sut.runFrame()

          expect(cpu.step).toHaveBeenCalledTimes(2)
        })
        it('should continue consuming cycles while the CPU is halted', () => {
          state.halted = true
          cpu.step.mockReturnValue(4)
          sut = new Z80Machine(cpu, memoryBus, 8)

          sut.runFrame()

          expect(cpu.step).toHaveBeenCalledTimes(2)
        })
        it('should not execute instructions when cycle budget has 0', () => {
          sut = new Z80Machine(cpu, memoryBus, 0)

          sut.runFrame()

          expect(cpu.step).not.toHaveBeenCalled()
        })
        it('should not execute instructions when cycle budget has negative', () => {
          sut = new Z80Machine(cpu, memoryBus, -1)

          sut.runFrame()

          expect(cpu.step).not.toHaveBeenCalled()
        })
        it('should not execute instructions when cycle budget has NaN', () => {
          sut = new Z80Machine(cpu, memoryBus, Number.NaN)

          sut.runFrame()

          expect(cpu.step).not.toHaveBeenCalled()
        })
        it('should not execute instructions when cycle budget has positive infinity', () => {
          sut = new Z80Machine(cpu, memoryBus, Number.POSITIVE_INFINITY)

          sut.runFrame()

          expect(cpu.step).not.toHaveBeenCalled()
        })
      })
      describe('Reset', () => {
        it('should reset the CPU and cycle balance without resetting the memory bus', () => {
          cpu.step.mockReturnValue(4)
          sut.runFrame()
          cpu.step.mockClear()

          sut.reset()
          sut.runFrame()

          expect(cpu.reset).toHaveBeenCalledOnce()
          expect(memoryBus.reset).not.toHaveBeenCalled()
          expect(cpu.step).toHaveBeenCalledTimes(3)
        })
      })
    })
  })
})
