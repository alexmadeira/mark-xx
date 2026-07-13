import { z } from 'zod/v4'

export const ZZ80CPU8ReadProps = z.tuple([z.number()])
export const ZZ80CPU8WriteProps = z.tuple([z.number(), z.number()])

export const ZZ80CPU8Read = z.custom<(...props: z.infer<typeof ZZ80CPU8ReadProps>) => number>()
export const ZZ80CPU8Write = z.custom<(...props: z.infer<typeof ZZ80CPU8WriteProps>) => void>()
export const ZZ80CPU8Fetch = z.custom<() => number>()

export const ZZ80CPU8 = z.object({
  read: ZZ80CPU8Read,
  write: ZZ80CPU8Write,
  fetch: ZZ80CPU8Fetch,
})

//
//
//

export type TZ80CPU8ReadProps = z.infer<typeof ZZ80CPU8ReadProps>
export type TZ80CPU8WriteProps = z.infer<typeof ZZ80CPU8WriteProps>

export type TZ80CPU8Read = z.infer<typeof ZZ80CPU8Read>
export type TZ80CPU8Write = z.infer<typeof ZZ80CPU8Write>
export type TZ80CPU8Fetch = z.infer<typeof ZZ80CPU8Fetch>

export interface IZ80CPU8 extends z.infer<typeof ZZ80CPU8> {}
