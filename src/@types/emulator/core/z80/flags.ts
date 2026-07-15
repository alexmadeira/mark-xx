import { z } from 'zod/v4'

export const ZZ80FlagSetProps = z.tuple([z.number(), z.boolean()])
export const ZZ80FlagHasFlagProps = z.tuple([z.number()])
export const ZZ80FlagUpdateSignProps = z.tuple([z.number()])
export const ZZ80FlagUpdateZeroProps = z.tuple([z.number()])
export const ZZ80FlagUpdateParityProps = z.tuple([z.number()])
export const ZZ80FlagCalculateParityProps = z.tuple([z.number()])

export const ZZ80FlagSet = z.custom<(...props: z.infer<typeof ZZ80FlagSetProps>) => void>()
export const ZZ80FlagHasFlag = z.custom<(...props: z.infer<typeof ZZ80FlagHasFlagProps>) => boolean>()
export const ZZ80FlagUpdateSign = z.custom<(...props: z.infer<typeof ZZ80FlagUpdateSignProps>) => void>()
export const ZZ80FlagUpdateZero = z.custom<(...props: z.infer<typeof ZZ80FlagUpdateZeroProps>) => void>()
export const ZZ80FlagUpdateParity = z.custom<(...props: z.infer<typeof ZZ80FlagUpdateParityProps>) => void>()
export const ZZ80FlagCalculateParity = z.custom<(...props: z.infer<typeof ZZ80FlagCalculateParityProps>) => boolean>()

export const ZZ80Flag = z.object({
  set: ZZ80FlagSet,
  hasFlag: ZZ80FlagHasFlag,
  updateSign: ZZ80FlagUpdateSign,
  updateZero: ZZ80FlagUpdateZero,
  updateParity: ZZ80FlagUpdateParity,
  calculateParity: ZZ80FlagCalculateParity,
})

//
//
//

export type TZ80FlagSetProps = z.infer<typeof ZZ80FlagSetProps>
export type TZ80FlagHasFlagProps = z.infer<typeof ZZ80FlagHasFlagProps>
export type TZ80FlagUpdateSignProps = z.infer<typeof ZZ80FlagUpdateSignProps>
export type TZ80FlagUpdateZeroProps = z.infer<typeof ZZ80FlagUpdateZeroProps>
export type TZ80FlagUpdateParityProps = z.infer<typeof ZZ80FlagUpdateParityProps>
export type TZ80FlagCalculateParityProps = z.infer<typeof ZZ80FlagCalculateParityProps>

export type TZ80FlagSet = z.infer<typeof ZZ80FlagSet>
export type TZ80FlagHasFlag = z.infer<typeof ZZ80FlagHasFlag>
export type TZ80FlagUpdateSign = z.infer<typeof ZZ80FlagUpdateSign>
export type TZ80FlagUpdateZero = z.infer<typeof ZZ80FlagUpdateZero>
export type TZ80FlagUpdateParity = z.infer<typeof ZZ80FlagUpdateParity>
export type TZ80FlagCalculateParity = z.infer<typeof ZZ80FlagCalculateParity>

export interface IZ80Flag extends z.infer<typeof ZZ80Flag> {}
