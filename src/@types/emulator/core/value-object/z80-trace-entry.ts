import { z } from 'zod/v4'

export const ZZ80TraceEntryData = z.object({
  a: z.number(),
  f: z.number(),
  b: z.number(),
  c: z.number(),
  d: z.number(),
  e: z.number(),
  h: z.number(),
  l: z.number(),
  pc: z.number(),
  sp: z.number(),
  opcode: z.number(),
  cycles: z.number(),
})

export const ZZ80TraceEntryCreateProps = z.tuple([ZZ80TraceEntryData])
export const ZZ80TraceEntryIsSameProps = z.tuple([z.unknown()])

export const ZZ80TraceEntryIsSame = z.custom<(...props: z.infer<typeof ZZ80TraceEntryIsSameProps>) => boolean>()
export const ZZ80TraceEntryToJSON = z.custom<() => z.infer<typeof ZZ80TraceEntryData>>()

export const ZZ80TraceEntryCreate =
  z.custom<(...props: z.infer<typeof ZZ80TraceEntryCreateProps>) => z.infer<typeof ZZ80TraceEntry>>()

export const ZZ80TraceEntryProps = ZZ80TraceEntryData

export const ZZ80TraceEntry = z.object({
  a: z.number(),
  f: z.number(),
  b: z.number(),
  c: z.number(),
  d: z.number(),
  e: z.number(),
  h: z.number(),
  l: z.number(),
  pc: z.number(),
  sp: z.number(),
  opcode: z.number(),
  cycles: z.number(),

  isSame: ZZ80TraceEntryIsSame,
  toJSON: ZZ80TraceEntryToJSON,
})

//
//
//

export type TZ80TraceEntryData = z.infer<typeof ZZ80TraceEntryData>

export type TZ80TraceEntryCreateProps = z.infer<typeof ZZ80TraceEntryCreateProps>
export type TZ80TraceEntryIsSameProps = z.infer<typeof ZZ80TraceEntryIsSameProps>

export type TZ80TraceEntryCreate = z.infer<typeof ZZ80TraceEntryCreate>

export type TZ80TraceEntryProps = z.infer<typeof ZZ80TraceEntryProps>
export interface IZ80TraceEntry extends z.infer<typeof ZZ80TraceEntry> {}
