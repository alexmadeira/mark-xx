import type { IZ80CPU } from '@/emulator/core/z80/cpu'
import type {
  IZ80Runner,
  TZ80RunnerRunCyclesProps,
  TZ80RunnerRunInstructionsProps,
  TZ80RunnerTraceCreate,
} from '@/emulator/core/z80/runner'

export class Z80Runner implements IZ80Runner {
  constructor(
    private readonly cpu: IZ80CPU,
    private readonly traceCreate: TZ80RunnerTraceCreate,
  ) {}

  public step() {
    const { state } = this.cpu
    const pc = state.pc
    const opcode = this.cpu.read8(pc)
    const cycles = this.cpu.step()

    return this.traceCreate({
      pc,
      opcode,
      cycles,
      a: state.a,
      f: state.f,
      b: state.b,
      c: state.c,
      d: state.d,
      e: state.e,
      h: state.h,
      l: state.l,
      sp: state.sp,
    })
  }

  public runCycles(...[maxCycles]: TZ80RunnerRunCyclesProps) {
    const trace = []
    let cycles = 0

    while (cycles < maxCycles && !this.cpu.state.halted) {
      const entry = this.step()

      trace.push(entry)
      cycles += entry.cycles
    }

    return trace
  }

  public runInstructions(...[maxInstructions]: TZ80RunnerRunInstructionsProps) {
    const trace = []
    const limit = Math.max(0, Math.floor(maxInstructions))

    while (trace.length < limit && !this.cpu.state.halted) {
      trace.push(this.step())
    }

    return trace
  }
}
