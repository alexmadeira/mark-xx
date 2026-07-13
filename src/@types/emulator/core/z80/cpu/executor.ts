import { z } from 'zod/v4'

export const ZZ80CPUExecutorHandler = z.custom<() => number>()
export const ZZ80CPUExecutorHandlers = z.partialRecord(z.number(), ZZ80CPUExecutorHandler)

export const ZZ80CPUExecutorExecuteOpcodeProps = z.tuple([z.number()])

export const ZZ80CPUExecutorExecuteOpcode =
  z.custom<(...props: z.infer<typeof ZZ80CPUExecutorExecuteOpcodeProps>) => number>()

export const ZZ80CPUExecutor = z.object({
  executeOpcode: ZZ80CPUExecutorExecuteOpcode,
})

//
//
//

export type TZ80CPUExecutorHandler = z.infer<typeof ZZ80CPUExecutorHandler>
export type TZ80CPUExecutorHandlers = z.infer<typeof ZZ80CPUExecutorHandlers>

export type TZ80CPUExecutorExecuteOpcodeProps = z.infer<typeof ZZ80CPUExecutorExecuteOpcodeProps>

export type TZ80CPUExecutorExecuteOpcode = z.infer<typeof ZZ80CPUExecutorExecuteOpcode>

export interface IZ80CPUExecutor extends z.infer<typeof ZZ80CPUExecutor> {}
