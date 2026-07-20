import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import { ZZ80State } from '@/emulator/core/z80/state'

export const ZZ80CPU16CreateProps = z.object({ byte: ZZ80Byte, cpu8: ZZ80CPU8, state: ZZ80State })

export const ZZ80CPU16PushProps = z.tuple([z.number()])

export const ZZ80CPU16Pop = z.custom<() => number>()
export const ZZ80CPU16Push = z.custom<(...props: z.infer<typeof ZZ80CPU16PushProps>) => void>()
export const ZZ80CPU16Fetch = z.custom<() => number>()

export const ZZ80CPU16 = z.object({
  pop: ZZ80CPU16Pop,
  push: ZZ80CPU16Push,
  fetch: ZZ80CPU16Fetch,
})

export const ZZ80CPU16Create = z.custom<(props: z.infer<typeof ZZ80CPU16CreateProps>) => z.infer<typeof ZZ80CPU16>>()

//
//
//

export type TZ80CPU16CreateProps = z.infer<typeof ZZ80CPU16CreateProps>
export type TZ80CPU16PushProps = z.infer<typeof ZZ80CPU16PushProps>

export type TZ80CPU16Pop = z.infer<typeof ZZ80CPU16Pop>
export type TZ80CPU16Push = z.infer<typeof ZZ80CPU16Push>
export type TZ80CPU16Fetch = z.infer<typeof ZZ80CPU16Fetch>

export type TZ80CPU16Create = z.infer<typeof ZZ80CPU16Create>
export interface IZ80CPU16 extends z.infer<typeof ZZ80CPU16> {}
