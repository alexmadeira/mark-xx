import type {
  IZ80TraceEntry,
  TZ80TraceEntryCreateProps,
  TZ80TraceEntryProps,
} from '@/emulator/core/value-object/z80-trace-entry'

export class Z80TraceEntryMock implements IZ80TraceEntry {
  public a: number
  public f: number
  public b: number
  public c: number
  public d: number
  public e: number
  public h: number
  public l: number
  public sp: number
  public pc: number
  public opcode: number
  public cycles: number

  constructor(overrides: Partial<TZ80TraceEntryProps>) {
    this.a = overrides.a || 0
    this.f = overrides.f || 0
    this.b = overrides.b || 0
    this.c = overrides.c || 0
    this.d = overrides.d || 0
    this.e = overrides.e || 0
    this.h = overrides.h || 0
    this.l = overrides.l || 0
    this.sp = overrides.sp || 0
    this.pc = overrides.pc || 0
    this.opcode = overrides.opcode || 0
    this.cycles = overrides.cycles || 0
  }

  static create = vi.fn((...[data]: TZ80TraceEntryCreateProps) => {
    return new Z80TraceEntryMock(data)
  })

  public readonly isSame = vi.fn<IZ80TraceEntry['isSame']>()
  public readonly toJSON = vi.fn<IZ80TraceEntry['toJSON']>()
}
