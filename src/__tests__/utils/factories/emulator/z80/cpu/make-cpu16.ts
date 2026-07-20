import type { TZ80CPU16CreateProps } from '@/emulator/core/z80/cpu/cpu16'

import { Z80CPU16 } from '_EMU/core/z80/cpu/cpu16'

import { makeZ80Byte } from '../make-byte'
import { makeZ80State } from '../make-state'
import { makeZ80CPU8 } from './make-cpu8'

export function makeZ80CPU16(overrides: Partial<TZ80CPU16CreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80CPU8 = makeZ80CPU8({ byte: z80Byte, state: z80State })

  return Z80CPU16.create({
    byte: z80Byte,
    cpu8: z80CPU8,
    state: z80State,
    ...overrides,
  })
}
