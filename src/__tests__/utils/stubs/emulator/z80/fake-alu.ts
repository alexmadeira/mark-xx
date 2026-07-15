import type {
  IZ80CPUAlu,
  TZ80CPUAluAddProps,
  TZ80CPUAluSubProps,
  TZ80CPUAluValueProps,
} from '@/emulator/core/z80/cpu/alu'

export class Z80CPUAluMock implements IZ80CPUAlu {
  public readonly add = vi.fn((..._props: TZ80CPUAluAddProps) => {})
  public readonly sub = vi.fn((..._props: TZ80CPUAluSubProps) => {})
  public readonly and = vi.fn((..._props: TZ80CPUAluValueProps) => {})
  public readonly or = vi.fn((..._props: TZ80CPUAluValueProps) => {})
  public readonly xor = vi.fn((..._props: TZ80CPUAluValueProps) => {})
  public readonly cp = vi.fn((..._props: TZ80CPUAluValueProps) => {})
}
