import type {
  IZ80CPUExecutor,
  TZ80CPUExecutorCreate,
  TZ80CPUExecutorExecuteOpcodeProps,
  TZ80CPUExecutorHandlers,
} from '@/emulator/core/z80/cpu/executor'

export class Z80CPUExecutorMock implements IZ80CPUExecutor {
  constructor(private readonly handlers: TZ80CPUExecutorHandlers = {}) {}

  static readonly create = vi.fn<TZ80CPUExecutorCreate>(() => new Z80CPUExecutorMock())

  public readonly executeOpcode = vi.fn((...[opcode]: TZ80CPUExecutorExecuteOpcodeProps): number => {
    const handler = this.handlers[opcode]

    if (!handler) throw new Error('Opcode not implemented')

    return handler()
  })
}
