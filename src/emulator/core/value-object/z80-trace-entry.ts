import type {
  IZ80TraceEntry,
  TZ80TraceEntryCreateProps,
  TZ80TraceEntryIsSameProps,
  TZ80TraceEntryProps,
} from '@/emulator/core/value-object/z80-trace-entry'

export class Z80TraceEntry implements IZ80TraceEntry {
  constructor(private readonly props: TZ80TraceEntryProps) {}

  static create(data: TZ80TraceEntryCreateProps) {
    return new Z80TraceEntry(data)
  }

  public isSame(...[traceEntry]: TZ80TraceEntryIsSameProps) {
    if (traceEntry instanceof Z80TraceEntry) return traceEntry.toJSON() === this.toJSON()
    return traceEntry === this.toJSON()
  }

  public toJSON() {
    return {
      a: this.a,
      f: this.f,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      h: this.h,
      l: this.l,
      sp: this.sp,
      pc: this.pc,
      opcode: this.opcode,
      cycles: this.cycles,
    }
  }

  public get a() {
    return this.props.a
  }
  public get f() {
    return this.props.f
  }
  public get b() {
    return this.props.b
  }
  public get c() {
    return this.props.c
  }
  public get d() {
    return this.props.d
  }
  public get e() {
    return this.props.e
  }
  public get h() {
    return this.props.h
  }
  public get l() {
    return this.props.l
  }
  public get sp() {
    return this.props.sp
  }
  public get pc() {
    return this.props.pc
  }
  public get opcode() {
    return this.props.opcode
  }
  public get cycles() {
    return this.props.cycles
  }
}
