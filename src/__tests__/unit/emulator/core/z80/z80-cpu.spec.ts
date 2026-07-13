import type { IZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'

import { Z80_CYCLES, Z80_MEMORY } from '_EMU/constants/z80'
import { Z80CPU } from '_EMU/core/z80/cpu'
import { Z80OpcodeNotImplementedError } from '_EMU/core/z80/errors'

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
          expect(executor.executeOpcode).toHaveBeenCalledWith(0x3e)
        })
        it('should reports the fetched opcode and its original program counter when execution fails', () => {
          state.pc = 0x1234
          cpu8.fetch.mockImplementationOnce(() => {
            state.pc += 1
            return 0xdd
          })
          executor.executeOpcode.mockImplementationOnce(() => {
            throw new Error('unsupported opcode')
          })

          expect(sut.step).toThrow(new Z80OpcodeNotImplementedError(0xdd, 0x1234))
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

      // it('should be able to create the initial CPU state', () => {
      //   expect(sut.state).toMatchObject({
      //     a: 0,
      //     b: 0,
      //     c: 0,
      //     d: 0,
      //     e: 0,
      //     f: 0,
      //     h: 0,
      //     i: 0,
      //     l: 0,
      //     r: 0,
      //     ix: 0,
      //     iy: 0,
      //     sp: 0xffff,
      //     pc: 0x0000,
      //     iff1: false,
      //     iff2: false,
      //     shadowA: 0,
      //     shadowB: 0,
      //     shadowC: 0,
      //     shadowD: 0,
      //     shadowE: 0,
      //     shadowF: 0,
      //     shadowH: 0,
      //     shadowL: 0,
      //     halted: false,
      //     interruptMode: 0,
      //   })
      // })
      // it('should be able to fetch 8-bit values and increment PC', () => {
      //   memoryBus.load([0xab])

      //   expect(sut.fetch8()).toBe(0xab)
      //   expect(sut.state.pc).toBe(0x0001)
      // })
      // it('should be able to fetch 16-bit values as little-endian and increment PC twice', () => {
      //   memoryBus.load([0xcd, 0xab])

      //   expect(sut.fetch16()).toBe(0xabcd)
      //   expect(sut.state.pc).toBe(0x0002)
      // })
      // it('should be able to execute NOP', () => {
      //   memoryBus.load([0x00])

      //   expect(sut.step()).toBe(4)
      //   expect(sut.state.pc).toBe(0x0001)
      // })
      // it('should be able to execute LD A,n', () => {
      //   memoryBus.load([0x3e, 0x42])

      //   expect(sut.step()).toBe(7)
      //   expect(sut.state.a).toBe(0x42)
      //   expect(sut.state.pc).toBe(0x0002)
      // })
      // it('should be able to execute 8-bit immediate register loads', () => {
      //   memoryBus.load([0x06, 0x01, 0x0e, 0x02, 0x16, 0x03, 0x1e, 0x04, 0x26, 0x05, 0x2e, 0x06])

      //   expect(sut.step()).toBe(7)
      //   expect(sut.step()).toBe(7)
      //   expect(sut.step()).toBe(7)
      //   expect(sut.step()).toBe(7)
      //   expect(sut.step()).toBe(7)
      //   expect(sut.step()).toBe(7)

      //   expect(sut.state.b).toBe(0x01)
      //   expect(sut.state.c).toBe(0x02)
      //   expect(sut.state.d).toBe(0x03)
      //   expect(sut.state.e).toBe(0x04)
      //   expect(sut.state.h).toBe(0x05)
      //   expect(sut.state.l).toBe(0x06)
      // })
      // it('should be able to execute 16-bit immediate register loads', () => {
      //   memoryBus.load([0x01, 0x34, 0x12, 0x11, 0x78, 0x56, 0x21, 0xbc, 0x9a, 0x31, 0xf0, 0xde])

      //   expect(sut.step()).toBe(10)
      //   expect(sut.step()).toBe(10)
      //   expect(sut.step()).toBe(10)
      //   expect(sut.step()).toBe(10)

      //   expect(sut.state.bc).toBe(0x1234)
      //   expect(sut.state.de).toBe(0x5678)
      //   expect(sut.state.hl).toBe(0x9abc)

      //   expect(sut.state.sp).toBe(0xdef0)
      // })
      // it('should be able to execute basic register-to-register loads', () => {
      //   memoryBus.load([0x78, 0x4f, 0x57])

      //   sut.state.a = 0x10
      //   sut.state.b = 0x20

      //   expect(sut.step()).toBe(4)
      //   expect(sut.state.a).toBe(0x20)

      //   expect(sut.step()).toBe(4)
      //   expect(sut.state.c).toBe(0x20)

      //   expect(sut.step()).toBe(4)
      //   expect(sut.state.d).toBe(0x20)
      // })
      // it('should be able to execute LD A,(HL)', () => {
      //   memoryBus.load([0x7e])

      //   sut.state.h = 0x40
      //   sut.state.l = 0x00
      //   memoryBus.write(0x4000, 0x99)

      //   expect(sut.step()).toBe(7)
      //   expect(sut.state.a).toBe(0x99)
      // })
      // it('should be able to execute LD (HL),A', () => {
      //   memoryBus.load([0x77])

      //   sut.state.a = 0x88
      //   sut.state.h = 0x40
      //   sut.state.l = 0x00

      //   expect(sut.step()).toBe(7)
      //   expect(memoryBus.read(0x4000)).toBe(0x88)
      // })
      // it('should be able to execute JP nn', () => {
      //   memoryBus.load([0xc3, 0x34, 0x12])

      //   expect(sut.step()).toBe(10)
      //   expect(sut.state.pc).toBe(0x1234)
      // })
      // it('should be able to execute CALL nn and push the return address', () => {
      //   memoryBus.load([0xcd, 0x00, 0x20])
      //   expect(sut.step()).toBe(17)
      //   expect(sut.state.pc).toBe(0x2000)
      //   expect(sut.state.sp).toBe(0xfffd)
      //   expect(memoryBus.read(0xfffd)).toBe(0x03)
      //   expect(memoryBus.read(0xfffe)).toBe(0x00)
      // })
      // it('should be able to execute RET and restore PC', () => {
      //   memoryBus.load([0xc9])

      //   sut.push16(0x3456)

      //   expect(sut.step()).toBe(10)
      //   expect(sut.state.pc).toBe(0x3456)
      //   expect(sut.state.sp).toBe(0xffff)
      // })
      // it('should be able to execute HALT', () => {
      //   memoryBus.load([0x76])

      //   expect(sut.step()).toBe(4)
      //   expect(sut.state.halted).toBe(true)
      // })
      // it('should delegate INC A to register increment', () => {
      //   memoryBus.load([0x3c])

      //   expect(sut.step()).toBe(4)

      //   expect(register.increment).toHaveBeenCalledTimes(1)
      //   expect(register.increment).toHaveBeenCalledWith('a')
      // })
      // it('should delegate DEC A to register decrement', () => {
      //   memoryBus.load([0x3d])

      //   expect(sut.step()).toBe(4)

      //   expect(register.decrement).toHaveBeenCalledTimes(1)
      //   expect(register.decrement).toHaveBeenCalledWith('a')
      // })
      // it('should delegate INC A to register increment', () => {
      //   memoryBus.load([0x3c])

      //   expect(sut.step()).toBe(4)
      //   expect(register.increment).toHaveBeenCalledWith('a')
      // })
      // it('should delegate DEC A to register decrement', () => {
      //   memoryBus.load([0x3d])

      //   expect(sut.step()).toBe(4)

      //   expect(register.decrement).toHaveBeenCalledTimes(1)
      //   expect(register.decrement).toHaveBeenCalledWith('a')
      // })
      // it('should throw a Z80 error for unknown opcodes with the opcode PC', () => {
      //   memoryBus.load([0x00, 0xdd])
      //   expect(sut.step()).toBe(4)
      //   expect(() => sut.step()).throw(Z80OpcodeNotImplementedError)
      // })
    })
  })
})
