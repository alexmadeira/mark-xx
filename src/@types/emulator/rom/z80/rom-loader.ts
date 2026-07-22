import { z } from 'zod/v4'

import { ZZ80MemoryBus } from '@/emulator/core/z80/memory-bus'

export const ZZ80RomLoaderData = z.custom<Uint8Array>()
export const ZZ80RomLoaderMemorySize = z.number().int().nonnegative()

export const ZZ80RomLoaderCreateProps = z.object({
  memoryBus: ZZ80MemoryBus,
  memorySize: ZZ80RomLoaderMemorySize,
})

export const ZZ80RomLoaderLoadProps = z.tuple([ZZ80RomLoaderData, z.number()])
export const ZZ80RomLoaderLoad = z.custom<(...props: z.infer<typeof ZZ80RomLoaderLoadProps>) => void>()

export const ZZ80RomLoader = z.object({
  load: ZZ80RomLoaderLoad,
})

export const ZZ80RomLoaderCreate =
  z.custom<(props: z.infer<typeof ZZ80RomLoaderCreateProps>) => z.infer<typeof ZZ80RomLoader>>()

//
//
//

export type TZ80RomLoaderData = z.infer<typeof ZZ80RomLoaderData>
export type TZ80RomLoaderMemorySize = z.infer<typeof ZZ80RomLoaderMemorySize>

export type TZ80RomLoaderCreateProps = z.infer<typeof ZZ80RomLoaderCreateProps>
export type TZ80RomLoaderLoadProps = z.infer<typeof ZZ80RomLoaderLoadProps>

export type TZ80RomLoaderLoad = z.infer<typeof ZZ80RomLoaderLoad>
export type TZ80RomLoaderCreate = z.infer<typeof ZZ80RomLoaderCreate>

export interface IZ80RomLoader extends z.infer<typeof ZZ80RomLoader> {}
