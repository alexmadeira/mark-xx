import { Z80CPU8 } from '_EMU/core/z80/cpu/cpu8'

import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80MemoryBusMock } from '_TEST/utils/stubs/emulator/z80/fake-memory-bus'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let byte: Z80ByteMock
let state: Z80StateMock
let memoryBus: Z80MemoryBusMock

let sut: Z80CPU8

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    state = new Z80StateMock()
    memoryBus = new Z80MemoryBusMock()

    sut = new Z80CPU8(byte, state, memoryBus)
  })

  describe('Core', () => {
    describe('Z80 CPU 8-bit', () => {
      describe('Read', () => {
        it('should normalize the address, read the memory and normalize the result', () => {
          byte.toByte.mockReturnValueOnce(0xab)
          byte.toWord.mockReturnValueOnce(0x2345)
          memoryBus.read.mockReturnValueOnce(0x1ab)

          const result = sut.read(0x12345)

          expect(result).toBe(0xab)
          expect(byte.toByte).toHaveBeenCalledWith(0x1ab)
          expect(byte.toWord).toHaveBeenCalledWith(0x12345)
          expect(memoryBus.read).toHaveBeenCalledWith(0x2345)
        })
      })
      describe('Write', () => {
        it('should normalize the address and value before writing to memory', () => {
          byte.toByte.mockReturnValueOnce(0xab)
          byte.toWord.mockReturnValueOnce(0x2345)

          sut.write(0x12345, 0x1ab)

          expect(byte.toByte).toHaveBeenCalledWith(0x1ab)
          expect(byte.toWord).toHaveBeenCalledWith(0x12345)
          expect(memoryBus.write).toHaveBeenCalledOnce()
          expect(memoryBus.write).toHaveBeenCalledWith(0x2345, 0xab)
        })
      })
      describe('Fetch', () => {
        it('should read from the program counter and increment it as a 16-bit value', () => {
          state.pc = 0xffff
          memoryBus.read.mockReturnValueOnce(0x42)

          const result = sut.fetch()

          expect(result).toBe(0x42)

          expect(state.pc).toBe(0x0000)
          expect(byte.toWord).toHaveBeenNthCalledWith(1, 0xffff)
          expect(byte.toWord).toHaveBeenNthCalledWith(2, 0x10000)
          expect(memoryBus.read).toHaveBeenCalledWith(0xffff)
        })
      })
    })
  })
})
