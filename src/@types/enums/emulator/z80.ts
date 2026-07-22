import { z } from 'zod/v4'

import {
  Z80_CPU_ALU_OPERATIONS,
  Z80_CPU_REGISTER_8,
  Z80_CPU_REGISTER_16,
  Z80_CPU_MEMORY_PAIRS,
  Z80_CPU_STACK_REGISTERS,
  Z80_CPU_ALU_LOGICAL_OPERATIONS,
  Z80_CPU_ALU_ARITHMETIC_OPERATIONS,
  Z80_CPU_CB_INSTRUCTION_ROTATE_OPERATIONS,
} from '_SRV/constant/emulator/z80'

export const ZEZ80CPURegister8 = z.enum(Z80_CPU_REGISTER_8)
export const ZEZ80CPURegister16 = z.enum(Z80_CPU_REGISTER_16)
export const ZEZ80CPUMemoryPair = z.enum(Z80_CPU_MEMORY_PAIRS)
export const ZEZ80CPUAluOperation = z.enum(Z80_CPU_ALU_OPERATIONS)
export const ZEZ80CPUStackRegister = z.enum(Z80_CPU_STACK_REGISTERS)
export const ZEZ80CPUAluLogicalOperation = z.enum(Z80_CPU_ALU_LOGICAL_OPERATIONS)
export const ZEZ80CPUAluArithmeticOperation = z.enum(Z80_CPU_ALU_ARITHMETIC_OPERATIONS)
export const ZEZ80CPUCBInstructionRotateOperation = z.enum(Z80_CPU_CB_INSTRUCTION_ROTATE_OPERATIONS)

//
//
//
//

export type TEZ80CPURegister8 = z.infer<typeof ZEZ80CPURegister8>
export type TEZ80CPURegister16 = z.infer<typeof ZEZ80CPURegister16>
export type TEZ80CPUMemoryPair = z.infer<typeof ZEZ80CPUMemoryPair>
export type TEZ80CPUAluOperation = z.infer<typeof ZEZ80CPUAluOperation>
export type TEZ80CPUStackRegister = z.infer<typeof ZEZ80CPUStackRegister>
export type TEZ80CPUAluLogicalOperation = z.infer<typeof ZEZ80CPUAluLogicalOperation>
export type TEZ80CPUAluArithmeticOperation = z.infer<typeof ZEZ80CPUAluArithmeticOperation>
export type TEZ80CPUCBInstructionRotateOperation = z.infer<typeof ZEZ80CPUCBInstructionRotateOperation>
