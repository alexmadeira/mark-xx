import { z } from 'zod/v4'

export const ZZ80MemoryBusMemory = z.custom<ArrayLike<number>>()
export const ZZ80MemoryBusMemorySeed = z.union([ZZ80MemoryBusMemory, z.number()])

export function ZZ80MemoryBusCreateMemory<TMenory>() {
  return z.custom<(memorySeed: z.infer<typeof ZZ80MemoryBusMemorySeed>) => TMenory>()
}

export const ZZ80MemoryBusReadProps = z.tuple([z.number()])
export const ZZ80MemoryBusWriteProps = z.tuple([z.number(), z.number()])
export const ZZ80MemoryBusLoadProps = z.union([
  z.tuple([ZZ80MemoryBusMemory]),
  z.tuple([ZZ80MemoryBusMemory, z.number()]),
])

export const ZZ80MemoryBusLoad = z.custom<(...props: z.infer<typeof ZZ80MemoryBusLoadProps>) => void>()
export const ZZ80MemoryBusRead = z.custom<(...props: z.infer<typeof ZZ80MemoryBusReadProps>) => number>()
export const ZZ80MemoryBusWrite = z.custom<(...props: z.infer<typeof ZZ80MemoryBusWriteProps>) => void>()
export const ZZ80MemoryBusReset = z.custom<() => void>()

export const ZZ80MemoryBus = z.object({
  load: ZZ80MemoryBusLoad,
  read: ZZ80MemoryBusRead,
  write: ZZ80MemoryBusWrite,
  reset: ZZ80MemoryBusReset,
})

//
//
//

export type TZ80MemoryBusMemory = z.infer<typeof ZZ80MemoryBusMemory>
export type TZ80MemoryBusMemorySeed = z.infer<typeof ZZ80MemoryBusMemorySeed>

export type TZ80MemoryBusLoadProps = z.infer<typeof ZZ80MemoryBusLoadProps>
export type TZ80MemoryBusReadProps = z.infer<typeof ZZ80MemoryBusReadProps>
export type TZ80MemoryBusWriteProps = z.infer<typeof ZZ80MemoryBusWriteProps>

export type TZ80MemoryBusLoad = z.infer<typeof ZZ80MemoryBusLoad>
export type TZ80MemoryBusRead = z.infer<typeof ZZ80MemoryBusRead>
export type TZ80MemoryBusWrite = z.infer<typeof ZZ80MemoryBusWrite>
export type TZ80MemoryBusReset = z.infer<typeof ZZ80MemoryBusReset>

export type TZ80MemoryBusCreateMemory<TMenory> = z.inferGeneric<typeof ZZ80MemoryBusCreateMemory<TMenory>>

export interface IZ80MemoryBus extends z.infer<typeof ZZ80MemoryBus> {}
