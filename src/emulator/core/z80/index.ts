import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'
import type { IZ80Byte, TZ80ByteCreate } from '@/emulator/core/z80/byte'
import type { IZ80Core, TZ80CoreProps } from '@/emulator/core/z80/core'
import type { IZ80CPU, TZ80CPUCreate } from '@/emulator/core/z80/cpu'
import type { IZ80CPUAlu, TZ80CPUAluCreate } from '@/emulator/core/z80/cpu/alu'
import type { IZ80CBInstruction, TZ80CBInstructionCreate } from '@/emulator/core/z80/cpu/cb-instruction'
import type { IZ80CPU16, TZ80CPU16Create } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8, TZ80CPU8Create } from '@/emulator/core/z80/cpu/cpu8'
import type { IZ80CPUExecutor, TZ80CPUExecutorCreate } from '@/emulator/core/z80/cpu/executor'
import type { IZ80CPURegister, TZ80CPURegisterCreate } from '@/emulator/core/z80/cpu/register'
import type { IZ80Flag, TZ80FlagCreate } from '@/emulator/core/z80/flags'
import type { IZ80MemoryBus, TZ80MemoryBusCreate } from '@/emulator/core/z80/memory-bus'
import type { IZ80State, TZ80StateCreate } from '@/emulator/core/z80/state'

export class Z80Core implements IZ80Core {
  public readonly cpu: IZ80CPU
  public readonly byte: IZ80Byte
  public readonly flag: IZ80Flag
  public readonly state: IZ80State
  public readonly memoryBus: IZ80MemoryBus

  private readonly alu: IZ80CPUAlu
  private readonly cbInstruction: IZ80CBInstruction
  private readonly cpu8: IZ80CPU8
  private readonly cpu16: IZ80CPU16
  private readonly register: IZ80CPURegister
  private readonly executor: IZ80CPUExecutor

  constructor(
    private readonly createCPU: TZ80CPUCreate,
    private readonly createAlu: TZ80CPUAluCreate,
    private readonly createCBInstruction: TZ80CBInstructionCreate,
    private readonly createCPU8: TZ80CPU8Create,
    private readonly createCPU16: TZ80CPU16Create,
    private readonly createRegister: TZ80CPURegisterCreate,
    private readonly createExecutor: TZ80CPUExecutorCreate,
    private readonly createByte: TZ80ByteCreate,
    private readonly createFlag: TZ80FlagCreate,
    private readonly createState: TZ80StateCreate,
    private readonly createMemoryBus: TZ80MemoryBusCreate<IByteMemory>,
    private readonly props: TZ80CoreProps<IByteMemory>,
  ) {
    this.byte = this.createByte()
    this.state = this.createState({ byte: this.byte })
    this.flag = this.createFlag({ byte: this.byte, state: this.state })
    this.memoryBus = this.createMemoryBus({
      byte: this.byte,
      seed: this.props.memorySize,
      createMemory: this.props.createMemory,
    })
    if (this.props.memory) this.memoryBus.load(this.props.memory)

    this.alu = this.createAlu({ byte: this.byte, flag: this.flag, state: this.state })
    this.cpu8 = this.createCPU8({ byte: this.byte, state: this.state, memoryBus: this.memoryBus })
    this.cpu16 = this.createCPU16({ byte: this.byte, cpu8: this.cpu8, state: this.state })
    this.cbInstruction = this.createCBInstruction({
      byte: this.byte,
      cpu8: this.cpu8,
      flag: this.flag,
      state: this.state,
    })
    this.register = this.createRegister({ byte: this.byte, flag: this.flag, state: this.state })
    this.executor = this.createExecutor({
      alu: this.alu,
      byte: this.byte,
      cbInstruction: this.cbInstruction,
      cpu8: this.cpu8,
      flag: this.flag,
      cpu16: this.cpu16,
      state: this.state,
      register: this.register,
    })

    this.cpu = this.createCPU({
      cpu8: this.cpu8,
      cpu16: this.cpu16,
      state: this.state,
      executor: this.executor,
    })
  }
}
