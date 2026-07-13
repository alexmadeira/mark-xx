import { z } from 'zod/v4'

export const ZZ80CPU16PushProps = z.tuple([z.number()])

export const ZZ80CPU16Pop = z.custom<() => number>()
export const ZZ80CPU16Push = z.custom<(...props: z.infer<typeof ZZ80CPU16PushProps>) => void>()
export const ZZ80CPU16Fetch = z.custom<() => number>()

export const ZZ80CPU16 = z.object({
  pop: ZZ80CPU16Pop,
  push: ZZ80CPU16Push,
  fetch: ZZ80CPU16Fetch,
})

//
//
//

export type TZ80CPU16PushProps = z.infer<typeof ZZ80CPU16PushProps>

export type TZ80CPU16Pop = z.infer<typeof ZZ80CPU16Pop>
export type TZ80CPU16Push = z.infer<typeof ZZ80CPU16Push>
export type TZ80CPU16Fetch = z.infer<typeof ZZ80CPU16Fetch>

export interface IZ80CPU16 extends z.infer<typeof ZZ80CPU16> {}
