import type { TZ80CPUExecutorCreateProps } from '@/emulator/core/z80/cpu/executor'

import { Z80CBInstruction } from '_EMU/core/z80/cpu/cb-instruction'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'

import { makeZ80Byte } from '../make-byte'
import { makeZ80Flag } from '../make-flag'
import { makeZ80State } from '../make-state'
import { makeZ80CPUAlu } from './make-alu'
import { makeZ80CPU16 } from './make-cpu16'
import { makeZ80CPU8 } from './make-cpu8'
import { makeZ80CPURegister } from './make-register'

export function makeZ80CPUExecutor(overrides: Partial<TZ80CPUExecutorCreateProps> = {}) {
  const z80Byte = makeZ80Byte()
  const z80State = makeZ80State({ byte: z80Byte })
  const z80Flag = makeZ80Flag({ byte: z80Byte, state: z80State })
  const z80CPU8 = makeZ80CPU8({ byte: z80Byte, state: z80State })
  const z80CPU16 = makeZ80CPU16({
    byte: z80Byte,
    cpu8: z80CPU8,
    state: z80State,
  })
  const z80Register = makeZ80CPURegister({
    byte: z80Byte,
    flag: z80Flag,
    state: z80State,
  })
  const z80Alu = makeZ80CPUAlu({
    byte: z80Byte,
    flag: z80Flag,
    state: z80State,
  })
  const z80CBInstruction = Z80CBInstruction.create({
    byte: z80Byte,
    cpu8: z80CPU8,
    flag: z80Flag,
    state: z80State,
  })

  return Z80CPUExecutor.create({
    alu: z80Alu,
    byte: z80Byte,
    cbInstruction: z80CBInstruction,
    flag: z80Flag,
    cpu8: z80CPU8,
    cpu16: z80CPU16,
    state: z80State,
    register: z80Register,
    ...overrides,
  })
}
