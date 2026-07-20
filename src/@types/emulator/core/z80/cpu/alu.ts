import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80Flag } from '@/emulator/core/z80/flags'
import { ZZ80State } from '@/emulator/core/z80/state'

export const ZZ80CPUAluCreateProps = z.tuple([ZZ80State, ZZ80Flag, ZZ80Byte])

export const ZZ80CPUAluUpdateAddFlagsProps = z.tuple([z.number(), z.number(), z.number(), z.number(), z.number()])
export const ZZ80CPUAluUpdateSubFlagsProps = z.tuple([z.number(), z.number(), z.number(), z.number(), z.number()])
export const ZZ80CPUAluUpdateLogicFlagsProps = z.tuple([z.number(), z.boolean()])
export const ZZ80CPUAluUpdateResultFlagsProps = z.tuple([z.number()])

export const ZZ80CPUAluAddProps = z.tuple([z.number(), z.boolean().optional()])
export const ZZ80CPUAluSubProps = z.tuple([z.number(), z.boolean().optional()])
export const ZZ80CPUAluValueProps = z.tuple([z.number()])

export const ZZ80CPUAluCp = z.custom<(...props: z.infer<typeof ZZ80CPUAluValueProps>) => void>()
export const ZZ80CPUAluOr = z.custom<(...props: z.infer<typeof ZZ80CPUAluValueProps>) => void>()
export const ZZ80CPUAluAdd = z.custom<(...props: z.infer<typeof ZZ80CPUAluAddProps>) => void>()
export const ZZ80CPUAluSub = z.custom<(...props: z.infer<typeof ZZ80CPUAluSubProps>) => void>()
export const ZZ80CPUAluAnd = z.custom<(...props: z.infer<typeof ZZ80CPUAluValueProps>) => void>()
export const ZZ80CPUAluXor = z.custom<(...props: z.infer<typeof ZZ80CPUAluValueProps>) => void>()

export const ZZ80CPUAlu = z.object({
  cp: ZZ80CPUAluCp,
  or: ZZ80CPUAluOr,
  add: ZZ80CPUAluAdd,
  sub: ZZ80CPUAluSub,
  and: ZZ80CPUAluAnd,
  xor: ZZ80CPUAluXor,
})

export const ZZ80CPUAluCreate =
  z.custom<(...props: z.infer<typeof ZZ80CPUAluCreateProps>) => z.infer<typeof ZZ80CPUAlu>>()

//
//
//

export type TZ80CPUAluCreateProps = z.infer<typeof ZZ80CPUAluCreateProps>

export type TZ80CPUAluUpdateAddFlagsProps = z.infer<typeof ZZ80CPUAluUpdateAddFlagsProps>
export type TZ80CPUAluUpdateSubFlagsProps = z.infer<typeof ZZ80CPUAluUpdateSubFlagsProps>
export type TZ80CPUAluUpdateLogicFlagsProps = z.infer<typeof ZZ80CPUAluUpdateLogicFlagsProps>
export type TZ80CPUAluUpdateResultFlagsProps = z.infer<typeof ZZ80CPUAluUpdateResultFlagsProps>

export type TZ80CPUAluAddProps = z.infer<typeof ZZ80CPUAluAddProps>
export type TZ80CPUAluSubProps = z.infer<typeof ZZ80CPUAluSubProps>
export type TZ80CPUAluValueProps = z.infer<typeof ZZ80CPUAluValueProps>

export type TZ80CPUAluCreate = z.infer<typeof ZZ80CPUAluCreate>
export interface IZ80CPUAlu extends z.infer<typeof ZZ80CPUAlu> {}
