import { z } from 'zod/v4'

import { ZEZ80CPUAluOpration, ZEZ80CPURegister8 } from '@/enums/emulator/z80'

export const ZZ80CPUExecutorHandler = z.custom<() => number>()
export const ZZ80CPUExecutorHandlers = z.partialRecord(z.number(), ZZ80CPUExecutorHandler)

export const ZZ80CPUExecutorAluHLProps = z.tuple([ZEZ80CPUAluOpration, z.boolean().optional()])
export const ZZ80CPUExecutorExecuteAluProps = z.tuple([ZEZ80CPUAluOpration, z.number(), z.boolean().optional()])
export const ZZ80CPUExecutorAluRegisterProps = z.tuple([ZEZ80CPUAluOpration, ZEZ80CPURegister8, z.boolean().optional()])
export const ZZ80CPUExecutorAluImmediateProps = z.tuple([ZEZ80CPUAluOpration, z.boolean().optional()])

export const ZZ80CPUExecutorExecuteOpcodeProps = z.tuple([z.number(), z.number().optional()])

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

export type TZ80CPUExecutorAluHLProps = z.infer<typeof ZZ80CPUExecutorAluHLProps>
export type TZ80CPUExecutorExecuteAluProps = z.infer<typeof ZZ80CPUExecutorExecuteAluProps>
export type TZ80CPUExecutorAluRegisterProps = z.infer<typeof ZZ80CPUExecutorAluRegisterProps>
export type TZ80CPUExecutorAluImmediateProps = z.infer<typeof ZZ80CPUExecutorAluImmediateProps>

export type TZ80CPUExecutorExecuteOpcodeProps = z.infer<typeof ZZ80CPUExecutorExecuteOpcodeProps>

export type TZ80CPUExecutorExecuteOpcode = z.infer<typeof ZZ80CPUExecutorExecuteOpcode>

export interface IZ80CPUExecutor extends z.infer<typeof ZZ80CPUExecutor> {}
