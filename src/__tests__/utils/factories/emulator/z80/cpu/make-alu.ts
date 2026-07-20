import type { TZ80CPUAluCreateProps } from '@/emulator/core/z80/cpu/alu'

import { Z80CPUAlu } from '_EMU/core/z80/cpu/alu'

import { makeZ80Byte } from '../make-byte'
import { makeZ80Flag } from '../make-flag'
import { makeZ80State } from '../make-state'

export function makeZ80CPUAlu(overrides: Partial<TZ80CPUAluCreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80Flag = makeZ80Flag({ byte: z80Byte, state: z80State })

  return Z80CPUAlu.create({
    byte: z80Byte,
    state: z80State,
    flag: z80Flag,
    ...overrides,
  })
}
