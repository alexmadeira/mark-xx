import { z } from 'zod/v4'

export const ZSoundSystemSoundKey = z.union([z.string(), z.number(), z.symbol()])

export const ZSoundSystemSoundOptions = z.object({
  loop: z.boolean(),
  volume: z.number(),
})

export const ZSoundSystemSoundMap = z.record(
  ZSoundSystemSoundKey,
  z.object({
    src: z.string(),
    ...ZSoundSystemSoundOptions.partial().shape,
  }),
)

export function ZSoundSystemPlayProps<T extends z.infer<typeof ZSoundSystemSoundMap>>() {
  return z.tuple([z.custom<keyof T>(), ZSoundSystemSoundOptions.partial().optional()])
}
export function ZSoundSystemStopProps<T extends z.infer<typeof ZSoundSystemSoundMap>>() {
  return z.tuple([z.custom<keyof T>()])
}
export function ZSoundSystemPauseProps<T extends z.infer<typeof ZSoundSystemSoundMap>>() {
  return z.tuple([z.custom<keyof T>()])
}

//
//
//
//

export type TSoundSystemSoundKey = z.infer<typeof ZSoundSystemSoundKey>
export type TSoundSystemSoundOptions = z.infer<typeof ZSoundSystemSoundOptions>
export type TSoundSystemSoundMap = z.infer<typeof ZSoundSystemSoundMap>
export type TSoundSystemPlayProps<T extends TSoundSystemSoundMap> = z.inferGeneric<typeof ZSoundSystemPlayProps<T>>
export type TSoundSystemStopProps<T extends TSoundSystemSoundMap> = z.inferGeneric<typeof ZSoundSystemStopProps<T>>
export type TSoundSystemPauseProps<T extends TSoundSystemSoundMap> = z.inferGeneric<typeof ZSoundSystemPauseProps<T>>
