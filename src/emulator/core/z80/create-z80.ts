import type { IByteMemory } from '@/emulator/core/value-object/byte-memory'
import type { IZ80Byte, TZ80ByteCreate } from '@/emulator/core/z80/byte'
import type { IZ80Core, TZ80CoreProps } from '@/emulator/core/z80/core'
import type { IZ80CPU, TZ80CPUCreate } from '@/emulator/core/z80/cpu'
import type { IZ80CPUAlu, TZ80CPUAluCreate } from '@/emulator/core/z80/cpu/alu'
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
  private readonly cpu8: IZ80CPU8
  private readonly cpu16: IZ80CPU16
  private readonly register: IZ80CPURegister
  private readonly executor: IZ80CPUExecutor

  constructor(
    private readonly createCPU: TZ80CPUCreate,
    private readonly createAlu: TZ80CPUAluCreate,
    private readonly createCPU8: TZ80CPU8Create,
    private readonly createCPU16: TZ80CPU16Create,
    private readonly createRegister: TZ80CPURegisterCreate,
    private readonly createExecutor: TZ80CPUExecutorCreate,
    private readonly createByte: TZ80ByteCreate,
    private readonly createFlag: TZ80FlagCreate,
    private readonly createState: TZ80StateCreate,
    private readonly createMemoryBus: TZ80MemoryBusCreate,
    private readonly props: TZ80CoreProps<IByteMemory>,
  ) {
    this.byte = this.createByte()
    this.state = this.createState(this.byte)
    this.flag = this.createFlag(this.byte, this.state)

    this.memoryBus = this.createMemoryBus(this.props.memorySize, this.byte, this.props.createMemory)
    if (this.props.memory) this.memoryBus.load(this.props.memory)

    this.alu = this.createAlu(this.state, this.flag, this.byte)
    this.cpu8 = this.createCPU8(this.byte, this.state, this.memoryBus)
    this.cpu16 = this.createCPU16(this.byte, this.cpu8, this.state)
    this.register = this.createRegister(this.byte, this.flag, this.state)
    this.executor = this.createExecutor(
      this.alu,
      this.byte,
      this.flag,
      this.cpu8,
      this.cpu16,
      this.state,
      this.register,
    )

    this.cpu = this.createCPU(this.state, this.cpu8, this.cpu16, this.executor)
  }
}
