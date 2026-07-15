import { z } from 'zod/v4'

import { Z80_CPU_ALU_OPERATIONS, Z80_CPU_REGISTER_8 } from '_SRV/constant/emulator/z80'

export const ZEZ80CPURegister8 = z.enum(Z80_CPU_REGISTER_8)
export const ZEZ80CPUAluOpration = z.enum(Z80_CPU_ALU_OPERATIONS)

//
//
//
//

export type TEZ80CPURegister8 = z.infer<typeof ZEZ80CPURegister8>
export type TEZ80CPUAluOpration = z.infer<typeof ZEZ80CPUAluOpration>
