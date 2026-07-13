import type {
  IZ80Byte,
  TZ80ByteGetHighByteProps,
  TZ80ByteGetLowByteProps,
  TZ80ByteMakeWordProps,
  TZ80ByteSignedByteProps,
  TZ80ByteToByteProps,
  TZ80ByteToHexProps,
  TZ80ByteToWordProps,
} from '@/emulator/core/z80/byte'

export class Z80Byte implements IZ80Byte {
  public toByte(...[value]: TZ80ByteToByteProps) {
    return value & 0xff
  }

  public toWord(...[value]: TZ80ByteToWordProps) {
    return value & 0xffff
  }

  public makeWord(...[low, high]: TZ80ByteMakeWordProps) {
    return this.toWord(this.toByte(low) | (this.toByte(high) << 8))
  }

  public signedByte(...[value]: TZ80ByteSignedByteProps) {
    const byte = this.toByte(value)

    return byte > 0x7f ? byte - 0x100 : byte
  }

  public getLowByte(...[value]: TZ80ByteGetLowByteProps) {
    return this.toByte(value)
  }

  public getHighByte(...[value]: TZ80ByteGetHighByteProps) {
    return this.toByte(value >> 8)
  }

  public toHex(...[value, size]: TZ80ByteToHexProps) {
    return value.toString(16).padStart(size, '0')
  }
}
