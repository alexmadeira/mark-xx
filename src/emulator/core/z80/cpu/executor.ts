import type { IZ80CPU16 } from '@/emulator/core/z80/cpu/cpu16'
import type { IZ80CPU8 } from '@/emulator/core/z80/cpu/cpu8'
import type {
  IZ80CPUExecutor,
  TZ80CPUExecutorExecuteOpcodeProps,
  TZ80CPUExecutorHandlers,
} from '@/emulator/core/z80/cpu/executor'
import type { IZ80CPURegister } from '@/emulator/core/z80/cpu/register'
import type { IZ80State } from '@/emulator/core/z80/state'

import { Z80_CYCLES } from '_EMU/constants/z80'

export class Z80CPUExecutor implements IZ80CPUExecutor {
  constructor(
    private readonly state: IZ80State,
    private readonly cpu8: IZ80CPU8,
    private readonly cpu16: IZ80CPU16,
    private readonly register: IZ80CPURegister,
  ) {}

  private nop() {
    return Z80_CYCLES.nop
  }
  private halt() {
    this.state.halted = true
    return Z80_CYCLES.halt
  }
  private ldAB() {
    this.state.a = this.state.b
    return Z80_CYCLES.ldRR
  }
  private ldAC() {
    this.state.a = this.state.c
    return Z80_CYCLES.ldRR
  }
  private ldAD() {
    this.state.a = this.state.d
    return Z80_CYCLES.ldRR
  }
  private ldAE() {
    this.state.a = this.state.e
    return Z80_CYCLES.ldRR
  }
  private ldAH() {
    this.state.a = this.state.h
    return Z80_CYCLES.ldRR
  }
  private ldAL() {
    this.state.a = this.state.l
    return Z80_CYCLES.ldRR
  }
  private ldBA() {
    this.state.b = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldCA() {
    this.state.c = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldDA() {
    this.state.d = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldEA() {
    this.state.e = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldHA() {
    this.state.h = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldLA() {
    this.state.l = this.state.a
    return Z80_CYCLES.ldRR
  }
  private ldAN() {
    this.state.a = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldBN() {
    this.state.b = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldCN() {
    this.state.c = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldDN() {
    this.state.d = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldEN() {
    this.state.e = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldHN() {
    this.state.h = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldLN() {
    this.state.l = this.cpu8.fetch()
    return Z80_CYCLES.ldRN
  }
  private ldAFromHL() {
    this.state.a = this.cpu8.read(this.state.hl)
    return Z80_CYCLES.ldAHL
  }
  private ldHLFromA() {
    this.cpu8.write(this.state.hl, this.state.a)
    return Z80_CYCLES.ldHLA
  }
  private ldBCNN() {
    this.state.bc = this.cpu16.fetch()
    return Z80_CYCLES.ldRRNN
  }
  private ldDENN() {
    this.state.de = this.cpu16.fetch()
    return Z80_CYCLES.ldRRNN
  }
  private ldHLNN() {
    this.state.hl = this.cpu16.fetch()
    return Z80_CYCLES.ldRRNN
  }
  private ldSPNN() {
    this.state.sp = this.cpu16.fetch()
    return Z80_CYCLES.ldRRNN
  }
  private jpNN() {
    this.state.pc = this.cpu16.fetch()
    return Z80_CYCLES.jpNN
  }
  private callNN() {
    const address = this.cpu16.fetch()

    this.cpu16.push(this.state.pc)
    this.state.pc = address

    return Z80_CYCLES.callNN
  }
  private ret() {
    this.state.pc = this.cpu16.pop()
    return Z80_CYCLES.ret
  }
  private incA() {
    this.register.increment('a')
    return Z80_CYCLES.incDecR
  }
  private incB() {
    this.register.increment('b')
    return Z80_CYCLES.incDecR
  }
  private incC() {
    this.register.increment('c')
    return Z80_CYCLES.incDecR
  }
  private incD() {
    this.register.increment('d')
    return Z80_CYCLES.incDecR
  }
  private incE() {
    this.register.increment('e')
    return Z80_CYCLES.incDecR
  }
  private incH() {
    this.register.increment('h')
    return Z80_CYCLES.incDecR
  }
  private incL() {
    this.register.increment('l')
    return Z80_CYCLES.incDecR
  }
  private decA() {
    this.register.decrement('a')
    return Z80_CYCLES.incDecR
  }
  private decB() {
    this.register.decrement('b')
    return Z80_CYCLES.incDecR
  }
  private decC() {
    this.register.decrement('c')
    return Z80_CYCLES.incDecR
  }
  private decD() {
    this.register.decrement('d')
    return Z80_CYCLES.incDecR
  }
  private decE() {
    this.register.decrement('e')
    return Z80_CYCLES.incDecR
  }
  private decH() {
    this.register.decrement('h')
    return Z80_CYCLES.incDecR
  }
  private decL() {
    this.register.decrement('l')
    return Z80_CYCLES.incDecR
  }

  private get handlers(): TZ80CPUExecutorHandlers {
    return {
      0x00: this.nop.bind(this),
      0x76: this.halt.bind(this),

      0x78: this.ldAB.bind(this),
      0x79: this.ldAC.bind(this),
      0x7a: this.ldAD.bind(this),
      0x7b: this.ldAE.bind(this),
      0x7c: this.ldAH.bind(this),
      0x7d: this.ldAL.bind(this),

      0x47: this.ldBA.bind(this),
      0x4f: this.ldCA.bind(this),
      0x57: this.ldDA.bind(this),
      0x5f: this.ldEA.bind(this),
      0x67: this.ldHA.bind(this),
      0x6f: this.ldLA.bind(this),

      0x3e: this.ldAN.bind(this),
      0x06: this.ldBN.bind(this),
      0x0e: this.ldCN.bind(this),
      0x16: this.ldDN.bind(this),
      0x1e: this.ldEN.bind(this),
      0x26: this.ldHN.bind(this),
      0x2e: this.ldLN.bind(this),

      0x7e: this.ldAFromHL.bind(this),
      0x77: this.ldHLFromA.bind(this),

      0x01: this.ldBCNN.bind(this),
      0x11: this.ldDENN.bind(this),
      0x21: this.ldHLNN.bind(this),
      0x31: this.ldSPNN.bind(this),

      0xc3: this.jpNN.bind(this),
      0xcd: this.callNN.bind(this),
      0xc9: this.ret.bind(this),

      0x3c: this.incA.bind(this),
      0x04: this.incB.bind(this),
      0x0c: this.incC.bind(this),
      0x14: this.incD.bind(this),
      0x1c: this.incE.bind(this),
      0x24: this.incH.bind(this),
      0x2c: this.incL.bind(this),

      0x3d: this.decA.bind(this),
      0x05: this.decB.bind(this),
      0x0d: this.decC.bind(this),
      0x15: this.decD.bind(this),
      0x1d: this.decE.bind(this),
      0x25: this.decH.bind(this),
      0x2d: this.decL.bind(this),
    }
  }

  public executeOpcode(...[opcode]: TZ80CPUExecutorExecuteOpcodeProps) {
    const handler = this.handlers[opcode]

    if (!handler) throw new Error('unsupported opcode')

    return handler()
  }
}
