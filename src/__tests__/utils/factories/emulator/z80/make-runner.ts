import type { IZ80CPU } from '@/emulator/core/z80/cpu'
import type { TZ80RunnerTraceCreate } from '@/emulator/core/z80/runner'

import { Z80TraceEntry } from '_EMU/core/value-object/z80-trace-entry'
import { Z80Runner } from '_EMU/core/z80/z80-runner'

import { makeZ80CPU } from './cpu/make-cpu'

type TZ80RunnerOverrides = {
  cpu: IZ80CPU
  traceCreate: TZ80RunnerTraceCreate
}

export function makeZ80Runner(overrides: Partial<TZ80RunnerOverrides> = {}) {
  const props: TZ80RunnerOverrides = {
    cpu: makeZ80CPU(),
    traceCreate: Z80TraceEntry.create,
    ...overrides,
  }

  return new Z80Runner(props.cpu, props.traceCreate)
}
