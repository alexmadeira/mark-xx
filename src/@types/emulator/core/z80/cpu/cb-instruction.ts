import { z } from 'zod/v4'

import { ZZ80Byte } from '@/emulator/core/z80/byte'
import { ZZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import { ZZ80Flag } from '@/emulator/core/z80/flags'
import { ZZ80State } from '@/emulator/core/z80/state'
import { ZEZ80CPUCBInstructionRotateOperation, ZEZ80CPURegister8 } from '@/enums/emulator/z80'

export const ZZ80CBInstructionOperand = ZEZ80CPURegister8.nullable()

export const ZZ80CBInstructionHandler = z.custom<() => number>()
export const ZZ80CBInstructionHandlers = z.partialRecord(z.number(), ZZ80CBInstructionHandler)

export const ZZ80CBInstructionCreateProps = z.object({
  byte: ZZ80Byte,
  cpu8: ZZ80CPU8,
  flag: ZZ80Flag,
  state: ZZ80State,
})

export const ZZ80CBInstructionReadOperandProps = z.tuple([ZEZ80CPURegister8.nullable()])
export const ZZ80CBInstructionWriteOperandProps = z.tuple([ZEZ80CPURegister8.nullable(), z.number()])
export const ZZ80CBInstructionRotateProps = z.tuple([
  ZEZ80CPUCBInstructionRotateOperation,
  ZEZ80CPURegister8.nullable(),
])
export const ZZ80CBInstructionBitProps = z.tuple([z.number(), ZEZ80CPURegister8.nullable()])
export const ZZ80CBInstructionResetProps = z.tuple([z.number(), ZEZ80CPURegister8.nullable()])
export const ZZ80CBInstructionSetProps = z.tuple([z.number(), ZEZ80CPURegister8.nullable()])

export const ZZ80CBInstructionExecuteOpcodeProps = z.union([z.tuple([z.number()]), z.tuple([z.number(), z.number()])])

export const ZZ80CBInstructionReadOperand =
  z.custom<(...props: z.infer<typeof ZZ80CBInstructionReadOperandProps>) => number>()
export const ZZ80CBInstructionWriteOperand =
  z.custom<(...props: z.infer<typeof ZZ80CBInstructionWriteOperandProps>) => void>()
export const ZZ80CBInstructionRotate = z.custom<(...props: z.infer<typeof ZZ80CBInstructionRotateProps>) => number>()
export const ZZ80CBInstructionBit = z.custom<(...props: z.infer<typeof ZZ80CBInstructionBitProps>) => number>()
export const ZZ80CBInstructionReset = z.custom<(...props: z.infer<typeof ZZ80CBInstructionResetProps>) => number>()
export const ZZ80CBInstructionSet = z.custom<(...props: z.infer<typeof ZZ80CBInstructionSetProps>) => number>()

export const ZZ80CBInstructionExecuteOpcode =
  z.custom<(...props: z.infer<typeof ZZ80CBInstructionExecuteOpcodeProps>) => number>()

export const ZZ80CBInstruction = z.object({
  executeOpcode: ZZ80CBInstructionExecuteOpcode,
})

export const ZZ80CBInstructionCreate =
  z.custom<(props: z.infer<typeof ZZ80CBInstructionCreateProps>) => z.infer<typeof ZZ80CBInstruction>>()

//
//
//

export type TZ80CBInstructionOperand = z.infer<typeof ZZ80CBInstructionOperand>

export type TZ80CBInstructionHandler = z.infer<typeof ZZ80CBInstructionHandler>
export type TZ80CBInstructionHandlers = z.infer<typeof ZZ80CBInstructionHandlers>

export type TZ80CBInstructionCreateProps = z.infer<typeof ZZ80CBInstructionCreateProps>

export type TZ80CBInstructionReadOperandProps = z.infer<typeof ZZ80CBInstructionReadOperandProps>
export type TZ80CBInstructionWriteOperandProps = z.infer<typeof ZZ80CBInstructionWriteOperandProps>
export type TZ80CBInstructionRotateProps = z.infer<typeof ZZ80CBInstructionRotateProps>
export type TZ80CBInstructionBitProps = z.infer<typeof ZZ80CBInstructionBitProps>
export type TZ80CBInstructionResetProps = z.infer<typeof ZZ80CBInstructionResetProps>
export type TZ80CBInstructionSetProps = z.infer<typeof ZZ80CBInstructionSetProps>
export type TZ80CBInstructionExecuteOpcodeProps = z.infer<typeof ZZ80CBInstructionExecuteOpcodeProps>

export type TZ80CBInstructionReadOperand = z.infer<typeof ZZ80CBInstructionReadOperand>
export type TZ80CBInstructionWriteOperand = z.infer<typeof ZZ80CBInstructionWriteOperand>
export type TZ80CBInstructionRotate = z.infer<typeof ZZ80CBInstructionRotate>
export type TZ80CBInstructionBit = z.infer<typeof ZZ80CBInstructionBit>
export type TZ80CBInstructionReset = z.infer<typeof ZZ80CBInstructionReset>
export type TZ80CBInstructionSet = z.infer<typeof ZZ80CBInstructionSet>
export type TZ80CBInstructionExecuteOpcode = z.infer<typeof ZZ80CBInstructionExecuteOpcode>

export type TZ80CBInstructionCreate = z.infer<typeof ZZ80CBInstructionCreate>

export interface IZ80CBInstruction extends z.infer<typeof ZZ80CBInstruction> {}
