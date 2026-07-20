import type { IZ80CPUAlu } from '@/emulator/core/z80/cpu/alu'

export class Z80CPUAluMock implements IZ80CPUAlu {
  public readonly add = vi.fn<IZ80CPUAlu['add']>()
  public readonly sub = vi.fn<IZ80CPUAlu['sub']>()
  public readonly and = vi.fn<IZ80CPUAlu['and']>()
  public readonly or = vi.fn<IZ80CPUAlu['or']>()
  public readonly xor = vi.fn<IZ80CPUAlu['xor']>()
  public readonly cp = vi.fn<IZ80CPUAlu['cp']>()
}
