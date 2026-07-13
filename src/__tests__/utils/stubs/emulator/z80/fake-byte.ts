import type { IZ80Byte } from '@/emulator/core/z80/byte'

export class Z80ByteMock implements IZ80Byte {
  public readonly toByte = vi.fn((value: number) => {
    return value & 0xff
  })

  public readonly toWord = vi.fn((value: number) => {
    return value & 0xffff
  })

  public readonly makeWord = vi.fn((low: number, high: number) => {
    return this.toWord(this.toByte(low) | (this.toByte(high) << 8))
  })

  public readonly signedByte = vi.fn((value: number) => {
    const byte = this.toByte(value)

    return byte > 0x7f ? byte - 0x100 : byte
  })

  public readonly getLowByte = vi.fn((value: number) => {
    return this.toByte(value)
  })

  public readonly getHighByte = vi.fn((value: number) => {
    return this.toByte(value >> 8)
  })

  public readonly toHex = vi.fn((value: number, size: number) => {
    return value.toString(16).padStart(size, '0')
  })
}
