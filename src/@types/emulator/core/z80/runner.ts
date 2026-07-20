import { z } from 'zod/v4'

import { ZZ80TraceEntry, ZZ80TraceEntryData } from '@/emulator/core/value-object/z80-trace-entry'

export const ZZ80RunnerTraceCreate =
  z.custom<(trace: z.infer<typeof ZZ80TraceEntryData>) => z.infer<typeof ZZ80TraceEntry>>()

export const ZZ80RunnerRunCyclesProps = z.tuple([z.number()])
export const ZZ80RunnerRunInstructionsProps = z.tuple([z.number()])

export const ZZ80RunnerStep = z.custom<() => z.infer<typeof ZZ80TraceEntry>>()
export const ZZ80RunnerRunCycles =
  z.custom<(...props: z.infer<typeof ZZ80RunnerRunCyclesProps>) => z.infer<typeof ZZ80TraceEntry>[]>()
export const ZZ80RunnerRunInstructions =
  z.custom<(...props: z.infer<typeof ZZ80RunnerRunInstructionsProps>) => z.infer<typeof ZZ80TraceEntry>[]>()

export const ZZ80Runner = z.object({
  step: ZZ80RunnerStep,
  runCycles: ZZ80RunnerRunCycles,
  runInstructions: ZZ80RunnerRunInstructions,
})

//
//
//

export type TZ80RunnerTraceCreate = z.infer<typeof ZZ80RunnerTraceCreate>

export type TZ80RunnerRunCyclesProps = z.infer<typeof ZZ80RunnerRunCyclesProps>
export type TZ80RunnerRunInstructionsProps = z.infer<typeof ZZ80RunnerRunInstructionsProps>

export type TZ80RunnerStep = z.infer<typeof ZZ80RunnerStep>
export type TZ80RunnerRunCycles = z.infer<typeof ZZ80RunnerRunCycles>
export type TZ80RunnerRunInstructions = z.infer<typeof ZZ80RunnerRunInstructions>

export interface IZ80Runner extends z.infer<typeof ZZ80Runner> {}
