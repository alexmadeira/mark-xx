import { z } from 'zod/v4'

export const ZByteMemoryMemoryData = z.union([z.number(), z.custom<ArrayLike<number>>()])
export const ZByteMemoryUint8memory = z.instanceof(Uint8Array)

export const ZByteMemoryCreateProps = z.tuple([ZByteMemoryMemoryData])

export const ZByteMemoryIsByteMemory = z.custom<(value: unknown) => boolean>()
export const ZByteMemoryCreate =
  z.custom<(...props: z.infer<typeof ZByteMemoryCreateProps>) => z.infer<typeof ZByteMemory>>()

export const ZByteMemory = z.instanceof(Uint8Array)

//
//
//

export type TByteMemoryMemoryData = z.infer<typeof ZByteMemoryMemoryData>
export type TByteMemoryUint8memory = z.infer<typeof ZByteMemoryUint8memory>

export type TByteMemoryCreateProps = z.infer<typeof ZByteMemoryCreateProps>

export type TByteMemoryIsByteMemory = z.infer<typeof ZByteMemoryIsByteMemory>
export type TByteMemoryCreate = z.infer<typeof ZByteMemoryCreate>

export interface IByteMemory extends z.infer<typeof ZByteMemory> {}
