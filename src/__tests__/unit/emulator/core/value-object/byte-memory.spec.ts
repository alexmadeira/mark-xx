import { ByteMemory } from '_EMU/core/value-object/byte-memory'

describe('Emulator', () => {
  describe('Value Object', () => {
    describe('ByteMemory', () => {
      it('should create the byteMemory with length', () => {
        const memory = ByteMemory.create(10)

        expect(memory).toBeInstanceOf(ByteMemory)
        expect(memory.length).toBe(10)
        expect(memory[0]).toBe(0)
        expect(memory[9]).toBe(0)
      })
      it('should create the byteMemory with values', () => {
        const memory = ByteMemory.create([1, 2, 3, 4, 5])

        expect(memory).toBeInstanceOf(ByteMemory)
        expect(memory.length).toBe(5)
        expect(memory[0]).toBe(1)
        expect(memory[4]).toBe(5)
      })
      it('should return the same instance when data is already a ByteMemory', () => {
        const memory = ByteMemory.create([1, 2, 3, 4, 5])

        expect(ByteMemory.create(memory)).toBe(memory)
      })
    })
  })
})
