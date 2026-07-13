import { z } from 'zod/v4'

export const ZZ80CPURegister8 = z.literal(['a', 'b', 'c', 'd', 'e', 'h', 'l'])

export const ZZ80CPURegisterIncrementProps = z.tuple([ZZ80CPURegister8])
export const ZZ80CPURegisterDecrementProps = z.tuple([ZZ80CPURegister8])

export const ZZ80CPURegisterIncrement = z.custom<(...props: z.infer<typeof ZZ80CPURegisterIncrementProps>) => void>()
export const ZZ80CPURegisterDecrement = z.custom<(...props: z.infer<typeof ZZ80CPURegisterDecrementProps>) => void>()

export const ZZ80CPURegister = z.object({
  increment: ZZ80CPURegisterIncrement,
  decrement: ZZ80CPURegisterDecrement,
})

//
//
//

export type TZ80CPURegister8 = z.infer<typeof ZZ80CPURegister8>

export type TZ80CPURegisterIncrementProps = z.infer<typeof ZZ80CPURegisterIncrementProps>
export type TZ80CPURegisterDecrementProps = z.infer<typeof ZZ80CPURegisterDecrementProps>

export type TZ80CPURegisterIncrement = z.infer<typeof ZZ80CPURegisterIncrement>
export type TZ80CPURegisterDecrement = z.infer<typeof ZZ80CPURegisterDecrement>

export interface IZ80CPURegister extends z.infer<typeof ZZ80CPURegister> {}
