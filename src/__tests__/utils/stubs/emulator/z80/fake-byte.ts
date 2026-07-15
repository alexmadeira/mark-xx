import type { IZ80Byte } from '@/emulator/core/z80/byte'

export class Z80ByteMock implements IZ80Byte {
  public readonly toByte = vi.fn<IZ80Byte['toByte']>()
  public readonly toWord = vi.fn<IZ80Byte['toWord']>()
  public readonly makeWord = vi.fn<IZ80Byte['makeWord']>()
  public readonly signedByte = vi.fn<IZ80Byte['signedByte']>()
  public readonly getLowByte = vi.fn<IZ80Byte['getLowByte']>()
  public readonly getHighByte = vi.fn<IZ80Byte['getHighByte']>()
  public readonly toHex = vi.fn<IZ80Byte['toHex']>()
}
