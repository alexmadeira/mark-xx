import type { TZ80FlagCreateProps } from '@/emulator/core/z80/flags'

import { Z80Flag } from '_EMU/core/z80/flag'

import { makeZ80Byte } from './make-byte'
import { makeZ80State } from './make-state'

export function makeZ80Flag(overrides: Partial<TZ80FlagCreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })

  return Z80Flag.create({
    byte: z80Byte,
    state: z80State,
    ...overrides,
  })
}
