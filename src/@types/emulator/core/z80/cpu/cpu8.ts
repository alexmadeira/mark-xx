import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80MemoryBus } from '@/emulator/core/z80/memory-bus'
import { ZZ80State } from '@/emulator/core/z80/state'

export const ZZ80CPU8CreateProps = z.tuple([ZZ80Byte, ZZ80State, ZZ80MemoryBus])

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

export const ZZ80CPU8Create = z.custom<(...props: z.infer<typeof ZZ80CPU8CreateProps>) => z.infer<typeof ZZ80CPU8>>()

//
//
//

export type TZ80CPU8CreateProps = z.infer<typeof ZZ80CPU8CreateProps>

export type TZ80CPU8ReadProps = z.infer<typeof ZZ80CPU8ReadProps>
export type TZ80CPU8WriteProps = z.infer<typeof ZZ80CPU8WriteProps>

export type TZ80CPU8Read = z.infer<typeof ZZ80CPU8Read>
export type TZ80CPU8Write = z.infer<typeof ZZ80CPU8Write>
export type TZ80CPU8Fetch = z.infer<typeof ZZ80CPU8Fetch>

export type TZ80CPU8Create = z.infer<typeof ZZ80CPU8Create>
export interface IZ80CPU8 extends z.infer<typeof ZZ80CPU8> {}
