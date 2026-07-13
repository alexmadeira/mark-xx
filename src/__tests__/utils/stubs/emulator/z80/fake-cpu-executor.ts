import type { IZ80CPUExecutor, TZ80CPUExecutorHandlers } from '@/emulator/core/z80/cpu/executor'

export class Z80CPUExecutorMock implements IZ80CPUExecutor {
  constructor(private readonly handlers: TZ80CPUExecutorHandlers = {}) {}

  public readonly executeOpcode = vi.fn((opcode: number): number => {
    const handler = this.handlers[opcode]

    console.log(`Executing opcode: ${opcode.toString(16).padStart(2, '0')}`)
    if (!handler) throw new Error('Opcode not implemented')

    return handler()
  })
}
