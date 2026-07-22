import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'
import type { TZ80ByteCreate } from '@/emulator/core/z80/byte'
import type { TZ80CoreProps } from '@/emulator/core/z80/core'
import type { TZ80CPUCreate } from '@/emulator/core/z80/cpu'
import type { TZ80CPUAluCreate } from '@/emulator/core/z80/cpu/alu'
import type { TZ80CBInstructionCreate } from '@/emulator/core/z80/cpu/cb-instruction'
import type { TZ80CPU16Create } from '@/emulator/core/z80/cpu/cpu16'
import type { TZ80CPU8Create } from '@/emulator/core/z80/cpu/cpu8'
import type { TZ80CPUExecutorCreate } from '@/emulator/core/z80/cpu/executor'
import type { TZ80CPURegisterCreate } from '@/emulator/core/z80/cpu/register'
import type { TZ80FlagCreate } from '@/emulator/core/z80/flags'
import type { TZ80MemoryBusCreate } from '@/emulator/core/z80/memory-bus'
import type { TZ80StateCreate } from '@/emulator/core/z80/state'

import { ByteMemory } from '_EMU/core/value-object/byte-memory'
import { Z80Core } from '_EMU/core/z80'
import { Z80Byte } from '_EMU/core/z80/byte'
import { Z80CPU } from '_EMU/core/z80/cpu'
import { Z80CPUAlu } from '_EMU/core/z80/cpu/alu'
import { Z80CBInstruction } from '_EMU/core/z80/cpu/cb-instruction'
import { Z80CPU16 } from '_EMU/core/z80/cpu/cpu16'
import { Z80CPU8 } from '_EMU/core/z80/cpu/cpu8'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'
import { Z80CPURegister } from '_EMU/core/z80/cpu/register'
import { Z80Flag } from '_EMU/core/z80/flag'
import { Z80MemoryBus } from '_EMU/core/z80/memory-bus'
import { Z80State } from '_EMU/core/z80/state'

type TZ80CoreOverrides = {
  createCPU: TZ80CPUCreate
  createAlu: TZ80CPUAluCreate
  createCBInstruction: TZ80CBInstructionCreate
  createCPU8: TZ80CPU8Create
  createCPU16: TZ80CPU16Create
  createRegister: TZ80CPURegisterCreate
  createExecutor: TZ80CPUExecutorCreate
  createByte: TZ80ByteCreate
  createFlag: TZ80FlagCreate
  createState: TZ80StateCreate
  createMemoryBus: TZ80MemoryBusCreate<IByteMemory>
} & TZ80CoreProps<IByteMemory>

export function makeZ80Core(overrides: Partial<TZ80CoreOverrides> = {}) {
  const props: TZ80CoreOverrides = {
    createCPU: Z80CPU.create,
    createAlu: Z80CPUAlu.create,
    createCBInstruction: Z80CBInstruction.create,
    createCPU8: Z80CPU8.create,
    createCPU16: Z80CPU16.create,
    createRegister: Z80CPURegister.create,
    createExecutor: Z80CPUExecutor.create,
    createByte: Z80Byte.create,
    createFlag: Z80Flag.create,
    createState: Z80State.create,
    createMemoryBus: Z80MemoryBus.create,
    createMemory: ByteMemory.create,
    memorySize: 0x10000,
    ...overrides,
  }

  return new Z80Core(
    props.createCPU,
    props.createAlu,
    props.createCBInstruction,
    props.createCPU8,
    props.createCPU16,
    props.createRegister,
    props.createExecutor,
    props.createByte,
    props.createFlag,
    props.createState,
    props.createMemoryBus,
    {
      createMemory: props.createMemory,
      memory: props.memory,
      memorySize: props.memorySize,
    },
  )
}
