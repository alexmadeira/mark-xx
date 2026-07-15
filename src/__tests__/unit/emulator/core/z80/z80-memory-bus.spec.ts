import { Z80MemoryBus } from '_EMU/core/z80/memory-bus'

import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80ByteMemoryMock } from '_TEST/utils/stubs/emulator/z80/fake-byte-memory'

let byte: Z80ByteMock

let sut: Z80MemoryBus

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()

    sut = new Z80MemoryBus(0x10000, byte, Z80ByteMemoryMock.create)
  })

  describe('Core', () => {
    describe('Z80 Memory Bus', () => {
      describe('Constructor', () => {
        it('should create and initialize memory from the provided seed', () => {
          Z80ByteMemoryMock.create.mockClear()
          const memorySeed = [0x12, 0x34]
          byte.toWord
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0001)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0001)
          byte.toByte
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0x34)
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0x34)

          const memoryBus = new Z80MemoryBus(memorySeed, byte, Z80ByteMemoryMock.create)

          expect(Z80ByteMemoryMock.create).toHaveBeenNthCalledWith(1, memorySeed)
          expect(Z80ByteMemoryMock.create).toHaveBeenNthCalledWith(2, expect.any(Z80ByteMemoryMock))
          expect(memoryBus.read(0)).toBe(0x12)
          expect(memoryBus.read(1)).toBe(0x34)
        })
      })
      describe('Load', () => {
        it('should create memory data and load it from the default offset', () => {
          const data = [0x12, 0x1ff]
          byte.toWord
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0001)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0x0001)
          byte.toByte
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0xff)
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0xff)

          sut.load(data)

          expect(Z80ByteMemoryMock.create).toHaveBeenCalledWith(data)
          expect(sut.read(0x0000)).toBe(0x12)
          expect(sut.read(0x0001)).toBe(0xff)
        })
        it('should normalize the offset and wrap addresses at the end of memory', () => {
          byte.toWord
            .mockReturnValueOnce(0xffff)
            .mockReturnValueOnce(0xffff)
            .mockReturnValueOnce(0xffff)
            .mockReturnValueOnce(0x0000)
            .mockReturnValueOnce(0xffff)
            .mockReturnValueOnce(0x0000)
          byte.toByte
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0x34)
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0x34)

          sut.load([0x12, 0x34], 0x1ffff)

          expect(sut.read(0xffff)).toBe(0x12)
          expect(sut.read(0x0000)).toBe(0x34)
        })
      })
      describe('Read', () => {
        it('should normalize the address and returned value', () => {
          byte.toWord.mockReturnValueOnce(0x2345).mockReturnValueOnce(0x2345)
          byte.toByte.mockReturnValueOnce(0x42).mockReturnValueOnce(0xab)

          sut.write(0x2345, 0x42)

          expect(sut.read(0x12345)).toBe(0xab)
          expect(byte.toWord).toHaveBeenCalledWith(0x12345)
          expect(byte.toByte).toHaveBeenCalledWith(0x42)
        })
      })
      describe('Write', () => {
        it('should normalize the address and value before writing', () => {
          byte.toWord.mockReturnValueOnce(0x2345).mockReturnValueOnce(0x2345)
          byte.toByte.mockReturnValueOnce(0xab).mockReturnValueOnce(0xab)

          sut.write(0x12345, 0x1ab)

          expect(byte.toWord).toHaveBeenCalledWith(0x12345)
          expect(byte.toByte).toHaveBeenCalledWith(0x1ab)
          expect(sut.read(0x2345)).toBe(0xab)
        })
      })
      describe('Reset', () => {
        it('should clear all memory values', () => {
          byte.toWord
            .mockReturnValueOnce(0x2345)
            .mockReturnValueOnce(0x2345)
            .mockReturnValueOnce(0x2345)
            .mockReturnValueOnce(0x2346)
            .mockReturnValueOnce(0x2345)
            .mockReturnValueOnce(0x2346)
          byte.toByte
            .mockReturnValueOnce(0x12)
            .mockReturnValueOnce(0x34)
            .mockReturnValueOnce(0x00)
            .mockReturnValueOnce(0x00)

          sut.load([0x12, 0x34], 0x2345)

          sut.reset()

          expect(sut.read(0x2345)).toBe(0x00)
          expect(sut.read(0x2346)).toBe(0x00)
        })
      })
    })
  })
})
