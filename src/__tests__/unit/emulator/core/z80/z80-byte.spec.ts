import { Z80Byte } from '_EMU/core/z80/byte'

import { byteConversionCases, signedByteConversionCases, wordConversionCases } from '_TEST/utils/setup/emulator/z80'

let sut: Z80Byte

describe('Emulator', () => {
  beforeEach(() => {
    sut = new Z80Byte()
  })

  describe('Core', () => {
    describe('Z80 Byte', () => {
      describe('To Byte', () => {
        it.each(byteConversionCases)('should convert $value to $expected', ({ value, expected }) => {
          const result = sut.toByte(value)

          expect(result).toBe(expected)
        })
      })
      describe('To Word', () => {
        it.each(wordConversionCases)('should convert $value to $expected', ({ value, expected }) => {
          const result = sut.toWord(value)

          expect(result).toBe(expected)
        })
      })
      describe('Make Word', () => {
        it('should combine low and high bytes as a little-endian word', () => {
          const result = sut.makeWord(0x34, 0x12)

          expect(result).toBe(0x1234)
        })
        it('should normalize both bytes before combining them', () => {
          const result = sut.makeWord(0x134, 0x112)

          expect(result).toBe(0x1234)
        })
      })
      describe('Signed Byte', () => {
        it.each(signedByteConversionCases)('should convert $value to $expected', ({ value, expected }) => {
          const result = sut.signedByte(value)

          expect(result).toBe(expected)
        })
      })
      describe('Get Low Byte', () => {
        it('should return the least significant byte', () => {
          const result = sut.getLowByte(0x1234)

          expect(result).toBe(0x34)
        })
        it('should normalize values wider than a word', () => {
          const result = sut.getLowByte(0x12345)

          expect(result).toBe(0x45)
        })
      })
      describe('Get High Byte', () => {
        it('should return the most significant byte', () => {
          const result = sut.getHighByte(0x1234)

          expect(result).toBe(0x12)
        })
        it('should normalize values wider than a word', () => {
          const result = sut.getHighByte(0x12345)

          expect(result).toBe(0x23)
        })
      })
      describe('To Hex', () => {
        it('should format a lowercase hexadecimal value with zero padding', () => {
          const result = sut.toHex(0xab, 4)

          expect(result).toBe('00ab')
        })
        it('should not truncate values wider than the requested size', () => {
          const result = sut.toHex(0x1234, 2)

          expect(result).toBe('1234')
        })
      })
    })
  })
})
