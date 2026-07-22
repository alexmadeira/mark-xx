import type { IZ80CBInstruction, TZ80CBInstructionCreate } from '@/emulator/core/z80/cpu/cb-instruction'

export class Z80CBInstructionMock implements IZ80CBInstruction {
  static readonly create = vi.fn<TZ80CBInstructionCreate>(() => new Z80CBInstructionMock())

  public readonly executeOpcode = vi.fn<IZ80CBInstruction['executeOpcode']>()
}
