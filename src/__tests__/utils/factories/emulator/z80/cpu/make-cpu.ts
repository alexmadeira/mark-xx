import type { TZ80CPUCreateProps } from '@/emulator/core/z80/cpu'

import { Z80CPU } from '_EMU/core/z80/cpu'

import { makeZ80Byte } from '../make-byte'
import { makeZ80State } from '../make-state'
import { makeZ80CPU16 } from './make-cpu16'
import { makeZ80CPU8 } from './make-cpu8'
import { makeZ80CPUExecutor } from './make-executor'

export function makeZ80CPU(overrides: Partial<TZ80CPUCreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80CPU8 = makeZ80CPU8({ state: z80State, byte: z80Byte })
  const z80CPU16 = makeZ80CPU16({ state: z80State, byte: z80Byte })
  const z80CPUExecutor = makeZ80CPUExecutor({
    state: z80State,
    cpu8: z80CPU8,
    cpu16: z80CPU16,
  })

  return Z80CPU.create({
    state: z80State,
    cpu8: z80CPU8,
    cpu16: z80CPU16,
    executor: z80CPUExecutor,
    ...overrides,
  })
}
