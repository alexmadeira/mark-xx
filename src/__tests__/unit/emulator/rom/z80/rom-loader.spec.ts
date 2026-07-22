import { Z80RomLoader } from '_EMU/rom/z80/rom-loader'

import { Z80MemoryBusMock } from '_TEST/utils/stubs/emulator/z80/fake-memory-bus'

let memoryBus: Z80MemoryBusMock

let sut: Z80RomLoader

describe('Emulator', () => {
  beforeEach(() => {
    memoryBus = new Z80MemoryBusMock(4)

    sut = new Z80RomLoader(memoryBus, 4)
  })

  describe('ROM', () => {
    describe('Z80 ROM Loader', () => {
      it('should load ROM bytes into memory', () => {
        const data = new Uint8Array([0x12, 0x34])

        sut.load(data, 0)

        expect(memoryBus.load).toHaveBeenCalledOnce()
        expect(memoryBus.load).toHaveBeenCalledWith(data, 0)
      })
      it('should respect the load address', () => {
        const data = new Uint8Array([0x12, 0x34])

        sut.load(data, 2)

        expect(memoryBus.load).toHaveBeenCalledOnce()
        expect(memoryBus.load).toHaveBeenCalledWith(data, 2)
      })
      it('should truncate ROM data at the end of memory without wrapping', () => {
        sut.load(new Uint8Array([0x12, 0x34]), 3)

        expect(memoryBus.load).toHaveBeenCalledOnce()
        expect(memoryBus.load).toHaveBeenCalledWith(new Uint8Array([0x12]), 3)
      })
      it('should ignore a negative load address', () => {
        sut.load(new Uint8Array([0x12]), -1)

        expect(memoryBus.load).not.toHaveBeenCalled()
      })
      it('should ignore a non-integer load address', () => {
        sut.load(new Uint8Array([0x12]), 1.5)

        expect(memoryBus.load).not.toHaveBeenCalled()
      })
      it('should ignore a load address that exceeds memory size', () => {
        sut.load(new Uint8Array([0x12]), 4)

        expect(memoryBus.load).not.toHaveBeenCalled()
      })
      it('should ignore a load address that is NaN', () => {
        sut.load(new Uint8Array([0x12]), Number.NaN)

        expect(memoryBus.load).not.toHaveBeenCalled()
      })
      it('should ignore a load address that is positive infinity', () => {
        sut.load(new Uint8Array([0x12]), Number.POSITIVE_INFINITY)

        expect(memoryBus.load).not.toHaveBeenCalled()
      })
    })
  })
})
