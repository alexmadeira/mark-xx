import type {
  IZ80Byte,
  TZ80ByteToHexProps,
  TZ80ByteToByteProps,
  TZ80ByteToWordProps,
  TZ80ByteMakeWordProps,
  TZ80ByteSignedByteProps,
  TZ80ByteGetLowByteProps,
  TZ80ByteGetHighByteProps,
} from '@/emulator/core/z80/byte'

export class Z80ByteMock implements IZ80Byte {
  public readonly toByte = vi.fn((...[value]: TZ80ByteToByteProps) => {
    return value & 0xff
  })

  public readonly toWord = vi.fn((...[value]: TZ80ByteToWordProps) => {
    return value & 0xffff
  })

  public readonly makeWord = vi.fn((...[low, high]: TZ80ByteMakeWordProps) => {
    return this.toWord(this.toByte(low) | (this.toByte(high) << 8))
  })

  public readonly signedByte = vi.fn((...[value]: TZ80ByteSignedByteProps) => {
    const byte = this.toByte(value)

    return byte > 0x7f ? byte - 0x100 : byte
  })

  public readonly getLowByte = vi.fn((...[value]: TZ80ByteGetLowByteProps) => {
    return this.toByte(value)
  })

  public readonly getHighByte = vi.fn((...[value]: TZ80ByteGetHighByteProps) => {
    return this.toByte(value >> 8)
  })

  public readonly toHex = vi.fn((...[value, size]: TZ80ByteToHexProps) => {
    return value.toString(16).padStart(size, '0')
  })
}
