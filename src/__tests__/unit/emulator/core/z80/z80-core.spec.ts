import { Z80Core } from '_EMU/core/z80'

import { Z80CPUAluMock } from '_TEST/utils/stubs/emulator/z80/fake-alu'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80ByteMemoryMock } from '_TEST/utils/stubs/emulator/z80/fake-byte-memory'
import { Z80CPUMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu'
import { Z80CPUExecutorMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-executor'
import { Z80CPURegisterMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-register'
import { Z80CPU16Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu16'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80FlagMock } from '_TEST/utils/stubs/emulator/z80/fake-flag'
import { Z80MemoryBusMock } from '_TEST/utils/stubs/emulator/z80/fake-memory-bus'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let cpu: Z80CPUMock
let alu: Z80CPUAluMock
let cpu8: Z80CPU8Mock
let cpu16: Z80CPU16Mock
let register: Z80CPURegisterMock
let executor: Z80CPUExecutorMock
let byte: Z80ByteMock
let flag: Z80FlagMock
let state: Z80StateMock
let memoryBus: Z80MemoryBusMock

let sut: Z80Core

describe('Emulator', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    alu = new Z80CPUAluMock()
    byte = new Z80ByteMock()
    flag = new Z80FlagMock()
    state = new Z80StateMock()
    memoryBus = new Z80MemoryBusMock()
    cpu = new Z80CPUMock(state)
    cpu8 = new Z80CPU8Mock(state, memoryBus)
    cpu16 = new Z80CPU16Mock(cpu8, state)
    executor = new Z80CPUExecutorMock()
    register = new Z80CPURegisterMock(state)

    Z80CPUMock.create.mockReturnValue(cpu)
    Z80ByteMock.create.mockReturnValue(byte)
    Z80FlagMock.create.mockReturnValue(flag)
    Z80CPU8Mock.create.mockReturnValue(cpu8)
    Z80StateMock.create.mockReturnValue(state)
    Z80CPU16Mock.create.mockReturnValue(cpu16)
    Z80CPUAluMock.create.mockReturnValue(alu)
    Z80MemoryBusMock.create.mockReturnValue(memoryBus)
    Z80CPURegisterMock.create.mockReturnValue(register)
    Z80CPUExecutorMock.create.mockReturnValue(executor)

    sut = new Z80Core(
      Z80CPUMock.create,
      Z80CPUAluMock.create,
      Z80CPU8Mock.create,
      Z80CPU16Mock.create,
      Z80CPURegisterMock.create,
      Z80CPUExecutorMock.create,
      Z80ByteMock.create,
      Z80FlagMock.create,
      Z80StateMock.create,
      Z80MemoryBusMock.create,
      { memorySize: 0x10000, createMemory: Z80ByteMemoryMock.create },
    )
  })

  describe('Core', () => {
    describe('Z80 Core', () => {
      describe('Constructor', () => {
        it('should expose the public dependencies', () => {
          expect(sut.cpu).toBe(cpu)
          expect(sut.byte).toBe(byte)
          expect(sut.flag).toBe(flag)
          expect(sut.state).toBe(state)
          expect(sut.memoryBus).toBe(memoryBus)
        })
        it('should create every dependency with the composed dependencies', () => {
          expect(Z80CPUMock.create).toHaveBeenCalledWith({ state, cpu8, cpu16, executor })
          expect(Z80ByteMock.create).toHaveBeenCalledOnce()
          expect(Z80FlagMock.create).toHaveBeenCalledWith({ byte, state })
          expect(Z80CPU8Mock.create).toHaveBeenCalledWith({ byte, state, memoryBus })
          expect(Z80StateMock.create).toHaveBeenCalledWith({ byte })
          expect(Z80CPU16Mock.create).toHaveBeenCalledWith({ byte, cpu8, state })
          expect(Z80CPUAluMock.create).toHaveBeenCalledWith({ byte, flag, state })
          expect(Z80MemoryBusMock.create).toHaveBeenCalledWith({
            byte,
            seed: 0x10000,
            createMemory: Z80ByteMemoryMock.create,
          })
          expect(Z80CPURegisterMock.create).toHaveBeenCalledWith({ byte, flag, state })
          expect(Z80CPUExecutorMock.create).toHaveBeenCalledWith({
            alu,
            byte,
            cpu8,
            flag,
            cpu16,
            state,
            register,
          })
        })
        it('should not load memory when an initial memory is not provided', () => {
          expect(memoryBus.load).not.toHaveBeenCalled()
        })
        it('should load the provided initial memory', () => {
          const memory = new Uint8Array([0x3e, 0x42])
          new Z80Core(
            Z80CPUMock.create,
            Z80CPUAluMock.create,
            Z80CPU8Mock.create,
            Z80CPU16Mock.create,
            Z80CPURegisterMock.create,
            Z80CPUExecutorMock.create,
            Z80ByteMock.create,
            Z80FlagMock.create,
            Z80StateMock.create,
            Z80MemoryBusMock.create,
            { memory, memorySize: 0x10000, createMemory: Z80ByteMemoryMock.create },
          )
          expect(memoryBus.load).toHaveBeenCalledOnce()
          expect(memoryBus.load).toHaveBeenCalledWith(memory)
        })
      })
    })
  })
})
