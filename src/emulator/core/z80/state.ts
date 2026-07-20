import type { IZ80Byte } from '@/emulator/core/z80/byte'
import type {
  IZ80State,
  TZ80StateA,
  TZ80StateAF,
  TZ80StateB,
  TZ80StateBC,
  TZ80StateC,
  TZ80StateCreateProps,
  TZ80StateD,
  TZ80StateData,
  TZ80StateDE,
  TZ80StateE,
  TZ80StateF,
  TZ80StateH,
  TZ80StateHalted,
  TZ80StateHL,
  TZ80StateI,
  TZ80StateIff1,
  TZ80StateIff2,
  TZ80StateInterruptMode,
  TZ80StateIx,
  TZ80StateIy,
  TZ80StateL,
  TZ80StatePc,
  TZ80StateProps,
  TZ80StateR,
  TZ80StateShadowA,
  TZ80StateShadowB,
  TZ80StateShadowC,
  TZ80StateShadowD,
  TZ80StateShadowE,
  TZ80StateShadowF,
  TZ80StateShadowH,
  TZ80StateShadowL,
  TZ80StateSp,
} from '@/emulator/core/z80/state'

import _ from 'lodash'

export class Z80State implements IZ80State {
  private readonly state: TZ80StateData

  constructor(
    private readonly byte: IZ80Byte,
    private readonly props: TZ80StateProps = {},
  ) {
    this.state = this.build(this.props.state)
  }

  static create(...[byte, props]: TZ80StateCreateProps) {
    return new Z80State(byte, props)
  }

  private build(overrides: Partial<TZ80StateData> = {}): TZ80StateData {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      h: 0,
      i: 0,
      l: 0,
      r: 0,
      ix: 0,
      iy: 0,
      sp: 0xffff,
      pc: 0x0000,
      iff1: false,
      iff2: false,
      shadowA: 0,
      shadowB: 0,
      shadowC: 0,
      shadowD: 0,
      shadowE: 0,
      shadowF: 0,
      shadowH: 0,
      shadowL: 0,
      halted: false,
      interruptMode: 0,
      ...overrides,
    }
  }

  public reset() {
    _.assignIn(this.state, this.build(this.props.state))
  }

  public set a(a: TZ80StateA) {
    this.state.a = a
  }
  public set b(b: TZ80StateF) {
    this.state.b = b
  }
  public set c(c: TZ80StateB) {
    this.state.c = c
  }
  public set d(d: TZ80StateC) {
    this.state.d = d
  }
  public set e(e: TZ80StateD) {
    this.state.e = e
  }
  public set f(f: TZ80StateE) {
    this.state.f = f
  }
  public set h(h: TZ80StateH) {
    this.state.h = h
  }
  public set i(i: TZ80StateI) {
    this.state.i = i
  }
  public set l(l: TZ80StateL) {
    this.state.l = l
  }
  public set r(r: TZ80StateR) {
    this.state.r = r
  }
  public set ix(ix: TZ80StateIx) {
    this.state.ix = ix
  }
  public set iy(iy: TZ80StateIy) {
    this.state.iy = iy
  }
  public set sp(sp: TZ80StateSp) {
    this.state.sp = sp
  }
  public set pc(pc: TZ80StatePc) {
    this.state.pc = pc
  }
  public set iff1(iff1: TZ80StateIff1) {
    this.state.iff1 = iff1
  }
  public set iff2(iff2: TZ80StateIff2) {
    this.state.iff2 = iff2
  }
  public set halted(halted: TZ80StateHalted) {
    this.state.halted = halted
  }
  public set shadowA(shadowA: TZ80StateShadowA) {
    this.state.shadowA = shadowA
  }
  public set shadowB(shadowB: TZ80StateShadowF) {
    this.state.shadowB = shadowB
  }
  public set shadowC(shadowC: TZ80StateShadowB) {
    this.state.shadowC = shadowC
  }
  public set shadowD(shadowD: TZ80StateShadowC) {
    this.state.shadowD = shadowD
  }
  public set shadowE(shadowE: TZ80StateShadowD) {
    this.state.shadowE = shadowE
  }
  public set shadowF(shadowF: TZ80StateShadowE) {
    this.state.shadowF = shadowF
  }
  public set shadowH(shadowH: TZ80StateShadowH) {
    this.state.shadowH = shadowH
  }
  public set shadowL(shadowL: TZ80StateShadowL) {
    this.state.shadowL = shadowL
  }
  public set interruptMode(interruptMode: TZ80StateInterruptMode) {
    this.state.interruptMode = interruptMode
  }

  public set af(value: TZ80StateAF) {
    const word = this.byte.toWord(value)

    this.state.a = this.byte.getHighByte(word)
    this.state.f = this.byte.getLowByte(word)
  }

  public set bc(value: TZ80StateBC) {
    const word = this.byte.toWord(value)

    this.state.b = this.byte.getHighByte(word)
    this.state.c = this.byte.getLowByte(word)
  }

  public set de(value: TZ80StateDE) {
    const word = this.byte.toWord(value)

    this.state.d = this.byte.getHighByte(word)
    this.state.e = this.byte.getLowByte(word)
  }

  public set hl(value: TZ80StateHL) {
    const word = this.byte.toWord(value)

    this.state.h = this.byte.getHighByte(word)
    this.state.l = this.byte.getLowByte(word)
  }

  public get a() {
    return this.state.a
  }
  public get b() {
    return this.state.b
  }
  public get c() {
    return this.state.c
  }
  public get d() {
    return this.state.d
  }
  public get e() {
    return this.state.e
  }
  public get f() {
    return this.state.f
  }
  public get h() {
    return this.state.h
  }
  public get i() {
    return this.state.i
  }
  public get l() {
    return this.state.l
  }
  public get r() {
    return this.state.r
  }
  public get ix() {
    return this.state.ix
  }
  public get iy() {
    return this.state.iy
  }
  public get sp() {
    return this.state.sp
  }
  public get pc() {
    return this.state.pc
  }
  public get iff1() {
    return this.state.iff1
  }
  public get iff2() {
    return this.state.iff2
  }
  public get halted() {
    return this.state.halted
  }
  public get shadowA() {
    return this.state.shadowA
  }
  public get shadowB() {
    return this.state.shadowB
  }
  public get shadowC() {
    return this.state.shadowC
  }
  public get shadowD() {
    return this.state.shadowD
  }
  public get shadowE() {
    return this.state.shadowE
  }
  public get shadowF() {
    return this.state.shadowF
  }
  public get shadowH() {
    return this.state.shadowH
  }
  public get shadowL() {
    return this.state.shadowL
  }
  public get interruptMode() {
    return this.state.interruptMode
  }

  public get af() {
    return this.byte.toWord((this.state.a << 8) | this.state.f)
  }

  public get bc() {
    return this.byte.toWord((this.state.b << 8) | this.state.c)
  }

  public get de() {
    return this.byte.toWord((this.state.d << 8) | this.state.e)
  }

  public get hl() {
    return this.byte.toWord((this.state.h << 8) | this.state.l)
  }
}
