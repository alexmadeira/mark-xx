import { z } from 'zod/v4'

import { ZEZ80CPURegister8 } from '@/enums/emulator/z80'

export const ZZ80CPURegisterUpdateIncrementFlagsProps = z.tuple([z.number(), z.number()])
export const ZZ80CPURegisterUpdateDecrementFlagsProps = z.tuple([z.number(), z.number()])

export const ZZ80CPURegisterIncrementProps = z.tuple([ZEZ80CPURegister8])
export const ZZ80CPURegisterDecrementProps = z.tuple([ZEZ80CPURegister8])

export const ZZ80CPURegisterIncrement = z.custom<(...props: z.infer<typeof ZZ80CPURegisterIncrementProps>) => void>()
export const ZZ80CPURegisterDecrement = z.custom<(...props: z.infer<typeof ZZ80CPURegisterDecrementProps>) => void>()

export const ZZ80CPURegister = z.object({
  increment: ZZ80CPURegisterIncrement,
  decrement: ZZ80CPURegisterDecrement,
})

//
//
//

export type TZ80CPURegisterUpdateIncrementFlagsProps = z.infer<typeof ZZ80CPURegisterUpdateIncrementFlagsProps>
export type TZ80CPURegisterUpdateDecrementFlagsProps = z.infer<typeof ZZ80CPURegisterUpdateDecrementFlagsProps>

export type TZ80CPURegisterIncrementProps = z.infer<typeof ZZ80CPURegisterIncrementProps>
export type TZ80CPURegisterDecrementProps = z.infer<typeof ZZ80CPURegisterDecrementProps>

export type TZ80CPURegisterIncrement = z.infer<typeof ZZ80CPURegisterIncrement>
export type TZ80CPURegisterDecrement = z.infer<typeof ZZ80CPURegisterDecrement>

export interface IZ80CPURegister extends z.infer<typeof ZZ80CPURegister> {}
