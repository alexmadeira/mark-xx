import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80CPUAlu } from '@/emulator/core/z80/cpu/alu'
import { ZZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'
import { ZZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import { ZZ80CPURegister } from '@/emulator/core/z80/cpu/register'
import { ZZ80Flag } from '@/emulator/core/z80/flags'
import { ZZ80State } from '@/emulator/core/z80/state'
import {
  ZEZ80CPUAluOperation,
  ZEZ80CPUMemoryPair,
  ZEZ80CPURegister16,
  ZEZ80CPURegister8,
  ZEZ80CPUStackRegister,
} from '@/enums/emulator/z80'

export const ZZ80CPUOperand8 = ZEZ80CPURegister8.nullable()

export const ZZ80CPUExecutorHandler = z.custom<() => number>()
export const ZZ80CPUExecutorHandlers = z.partialRecord(z.number(), ZZ80CPUExecutorHandler)

export const ZZ80CPUExecutorCreateProps = z.object({
  alu: ZZ80CPUAlu,
  byte: ZZ80Byte,
  flag: ZZ80Flag,
  cpu8: ZZ80CPU8,
  cpu16: ZZ80CPU16,
  state: ZZ80State,
  register: ZZ80CPURegister,
})

export const ZZ80CPUExecutorAluHLProps = z.tuple([ZEZ80CPUAluOperation, z.boolean().optional()])
export const ZZ80CPUExecutorExecuteAluProps = z.tuple([ZEZ80CPUAluOperation, z.number(), z.boolean().optional()])
export const ZZ80CPUExecutorAluRegisterProps = z.tuple([
  ZEZ80CPUAluOperation,
  ZEZ80CPURegister8,
  z.boolean().optional(),
])
export const ZZ80CPUExecutorAluImmediateProps = z.tuple([ZEZ80CPUAluOperation, z.boolean().optional()])

export const ZZ80CPUExecutorLoad8Props = z.tuple([ZZ80CPUOperand8, ZZ80CPUOperand8])
export const ZZ80CPUExecutorLoadImmediate8Props = z.tuple([ZZ80CPUOperand8])
export const ZZ80CPUExecutorLoadImmediate16Props = z.tuple([ZEZ80CPURegister16])
export const ZZ80CPUExecutorLoadMemoryAtRegisterPairFromAProps = z.tuple([ZEZ80CPUMemoryPair])
export const ZZ80CPUExecutorLoadAFromMemoryAtRegisterPairProps = z.tuple([ZEZ80CPUMemoryPair])

export const ZZ80CPUExecutorIncrement8Props = z.tuple([ZEZ80CPURegister8])
export const ZZ80CPUExecutorDecrement8Props = z.tuple([ZEZ80CPURegister8])
export const ZZ80CPUExecutorIncrement16Props = z.tuple([ZEZ80CPURegister16])
export const ZZ80CPUExecutorDecrement16Props = z.tuple([ZEZ80CPURegister16])
export const ZZ80CPUExecutorAddHLProps = z.tuple([ZEZ80CPURegister16])

export const ZZ80CPUExecutorPushProps = z.tuple([ZEZ80CPUStackRegister])
export const ZZ80CPUExecutorPopProps = z.tuple([ZEZ80CPUStackRegister])

export const ZZ80CPUExecutorExecuteOpcodeProps = z.tuple([z.number(), z.number().optional()])

export const ZZ80CPUExecutorExecuteOpcode =
  z.custom<(...props: z.infer<typeof ZZ80CPUExecutorExecuteOpcodeProps>) => number>()

export const ZZ80CPUExecutor = z.object({
  executeOpcode: ZZ80CPUExecutorExecuteOpcode,
})

export const ZZ80CPUExecutorCreate =
  z.custom<(props: z.infer<typeof ZZ80CPUExecutorCreateProps>) => z.infer<typeof ZZ80CPUExecutor>>()

//
//
//

export type TZ80CPUExecutorHandler = z.infer<typeof ZZ80CPUExecutorHandler>
export type TZ80CPUExecutorHandlers = z.infer<typeof ZZ80CPUExecutorHandlers>

export type TZ80CPUExecutorCreateProps = z.infer<typeof ZZ80CPUExecutorCreateProps>

export type TZ80CPUExecutorAluHLProps = z.infer<typeof ZZ80CPUExecutorAluHLProps>
export type TZ80CPUExecutorExecuteAluProps = z.infer<typeof ZZ80CPUExecutorExecuteAluProps>
export type TZ80CPUExecutorAluRegisterProps = z.infer<typeof ZZ80CPUExecutorAluRegisterProps>
export type TZ80CPUExecutorAluImmediateProps = z.infer<typeof ZZ80CPUExecutorAluImmediateProps>

export type TZ80CPUExecutorLoad8Props = z.infer<typeof ZZ80CPUExecutorLoad8Props>
export type TZ80CPUExecutorLoadImmediate8Props = z.infer<typeof ZZ80CPUExecutorLoadImmediate8Props>
export type TZ80CPUExecutorLoadImmediate16Props = z.infer<typeof ZZ80CPUExecutorLoadImmediate16Props>
export type TZ80CPUExecutorLoadMemoryAtRegisterPairFromAProps = z.infer<
  typeof ZZ80CPUExecutorLoadMemoryAtRegisterPairFromAProps
>
export type TZ80CPUExecutorLoadAFromMemoryAtRegisterPairProps = z.infer<
  typeof ZZ80CPUExecutorLoadAFromMemoryAtRegisterPairProps
>

export type TZ80CPUExecutorIncrement8Props = z.infer<typeof ZZ80CPUExecutorIncrement8Props>
export type TZ80CPUExecutorDecrement8Props = z.infer<typeof ZZ80CPUExecutorDecrement8Props>
export type TZ80CPUExecutorIncrement16Props = z.infer<typeof ZZ80CPUExecutorIncrement16Props>
export type TZ80CPUExecutorDecrement16Props = z.infer<typeof ZZ80CPUExecutorDecrement16Props>
export type TZ80CPUExecutorAddHLProps = z.infer<typeof ZZ80CPUExecutorAddHLProps>

export type TZ80CPUExecutorPushProps = z.infer<typeof ZZ80CPUExecutorPushProps>
export type TZ80CPUExecutorPopProps = z.infer<typeof ZZ80CPUExecutorPopProps>

export type TZ80CPUExecutorExecuteOpcodeProps = z.infer<typeof ZZ80CPUExecutorExecuteOpcodeProps>

export type TZ80CPUExecutorExecuteOpcode = z.infer<typeof ZZ80CPUExecutorExecuteOpcode>

export type TZ80CPUExecutorCreate = z.infer<typeof ZZ80CPUExecutorCreate>
export interface IZ80CPUExecutor extends z.infer<typeof ZZ80CPUExecutor> {}
