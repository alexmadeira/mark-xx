import type { TZ80CPURegisterCreateProps } from '@/emulator/core/z80/cpu/register'

import { Z80CPURegister } from '_EMU/core/z80/cpu/register'

import { makeZ80Byte } from '../make-byte'
import { makeZ80Flag } from '../make-flag'
import { makeZ80State } from '../make-state'

export function makeZ80CPURegister(overrides: Partial<TZ80CPURegisterCreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80Flag = makeZ80Flag({ byte: z80Byte, state: z80State })

  return Z80CPURegister.create({
    byte: z80Byte,
    flag: z80Flag,
    state: z80State,
    ...overrides,
  })
}
