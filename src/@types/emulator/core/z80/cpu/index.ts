import { z } from 'zod/v4'

import { ZZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'
import { ZZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import { ZZ80CPUExecutor } from '@/emulator/core/z80/cpu/executor'
import { ZZ80State } from '@/emulator/core/z80/state'

export const ZZ80CPUCreateProps = z.object({
  state: ZZ80State,
  cpu8: ZZ80CPU8,
  cpu16: ZZ80CPU16,
  executor: ZZ80CPUExecutor,
})

export const ZZ80CPURead8Props = z.tuple([z.number()])
export const ZZ80CPUWrite8Props = z.tuple([z.number(), z.number()])
export const ZZ80CPUPush16Props = z.tuple([z.number()])
export const ZZ80CPURequestInterruptProps = z.tuple([z.number().optional()])

export const ZZ80CPUStep = z.custom<() => number>()
export const ZZ80CPUReset = z.custom<() => void>()

export const ZZ80CPURead8 = z.custom<(...props: z.infer<typeof ZZ80CPURead8Props>) => number>()
export const ZZ80CPUWrite8 = z.custom<(...props: z.infer<typeof ZZ80CPUWrite8Props>) => void>()
export const ZZ80CPUFetch8 = z.custom<() => number>()

export const ZZ80CPUPop16 = z.custom<() => number>()
export const ZZ80CPUPush16 = z.custom<(...props: z.infer<typeof ZZ80CPUPush16Props>) => void>()
export const ZZ80CPUFetch16 = z.custom<() => number>()

export const ZZ80CPURequestInterrupt = z.custom<(...props: z.infer<typeof ZZ80CPURequestInterruptProps>) => void>()

export const ZZ80CPU = z.object({
  state: ZZ80State,
  step: ZZ80CPUStep,
  reset: ZZ80CPUReset,
  read8: ZZ80CPURead8,
  write8: ZZ80CPUWrite8,
  fetch8: ZZ80CPUFetch8,
  pop16: ZZ80CPUPop16,
  push16: ZZ80CPUPush16,
  fetch16: ZZ80CPUFetch16,
  requestInterrupt: ZZ80CPURequestInterrupt,
})

export const ZZ80CPUCreate = z.custom<(props: z.infer<typeof ZZ80CPUCreateProps>) => z.infer<typeof ZZ80CPU>>()

//
//
//

export type TZ80CPUCreateProps = z.infer<typeof ZZ80CPUCreateProps>

export type TZ80CPURead8Props = z.infer<typeof ZZ80CPURead8Props>
export type TZ80CPUWrite8Props = z.infer<typeof ZZ80CPUWrite8Props>
export type TZ80CPUPush16Props = z.infer<typeof ZZ80CPUPush16Props>
export type TZ80CPURequestInterruptProps = z.infer<typeof ZZ80CPURequestInterruptProps>

export type TZ80CPUStep = z.infer<typeof ZZ80CPUStep>
export type TZ80CPUReset = z.infer<typeof ZZ80CPUReset>

export type TZ80CPURead8 = z.infer<typeof ZZ80CPURead8>
export type TZ80CPUWrite8 = z.infer<typeof ZZ80CPUWrite8>
export type TZ80CPUFetch8 = z.infer<typeof ZZ80CPUFetch8>

export type TZ80CPUPop16 = z.infer<typeof ZZ80CPUPop16>
export type TZ80CPUPush16 = z.infer<typeof ZZ80CPUPush16>
export type TZ80CPUFetch16 = z.infer<typeof ZZ80CPUFetch16>

export type TZ80CPURequestInterrupt = z.infer<typeof ZZ80CPURequestInterrupt>

export type TZ80CPUCreate = z.infer<typeof ZZ80CPUCreate>
export interface IZ80CPU extends z.infer<typeof ZZ80CPU> {}
