import type { TZ80StateCreateProps } from '@/emulator/core/z80/state'

import { Z80State } from '_EMU/core/z80/state'

import { makeZ80Byte } from './make-byte'

export function makeZ80State(overrides: Partial<TZ80StateCreateProps> = {}) {
  return Z80State.create({
    byte: makeZ80Byte(),
    ...overrides,
  })
}
