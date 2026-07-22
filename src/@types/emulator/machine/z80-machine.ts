import { z } from 'zod/v4'

import { ZZ80CPU } from '@/emulator/core/z80/cpu'
import { ZZ80MemoryBus } from '@/emulator/core/z80/memory-bus'

export const ZZ80MachineCreateProps = z.object({
  cpu: ZZ80CPU,
  memoryBus: ZZ80MemoryBus,
  cyclesPerFrame: z.number(),
})

export const ZZ80MachineStep = z.custom<() => number>()
export const ZZ80MachineReset = z.custom<() => void>()
export const ZZ80MachineRunFrame = z.custom<() => void>()

export const ZZ80Machine = z.object({
  cpu: ZZ80CPU,
  memoryBus: ZZ80MemoryBus,
  step: ZZ80MachineStep,
  reset: ZZ80MachineReset,
  runFrame: ZZ80MachineRunFrame,
})

export const ZZ80MachineCreate =
  z.custom<(props: z.infer<typeof ZZ80MachineCreateProps>) => z.infer<typeof ZZ80Machine>>()

//
//
//

export type TZ80MachineCreateProps = z.infer<typeof ZZ80MachineCreateProps>

export type TZ80MachineStep = z.infer<typeof ZZ80MachineStep>
export type TZ80MachineReset = z.infer<typeof ZZ80MachineReset>
export type TZ80MachineRunFrame = z.infer<typeof ZZ80MachineRunFrame>

export type TZ80MachineCreate = z.infer<typeof ZZ80MachineCreate>
export interface IZ80Machine extends z.infer<typeof ZZ80Machine> {}
