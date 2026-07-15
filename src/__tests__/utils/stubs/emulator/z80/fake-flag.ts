import type { IZ80Flag } from '@/emulator/core/z80/flags'

export class Z80FlagMock implements IZ80Flag {
  public readonly set = vi.fn<IZ80Flag['set']>()
  public readonly hasFlag = vi.fn<IZ80Flag['hasFlag']>()
  public readonly updateSign = vi.fn<IZ80Flag['updateSign']>()
  public readonly updateZero = vi.fn<IZ80Flag['updateZero']>()
  public readonly updateParity = vi.fn<IZ80Flag['updateParity']>()
  public readonly calculateParity = vi.fn<IZ80Flag['calculateParity']>()
}
