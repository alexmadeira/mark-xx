import type {
  IZ80State,
  TZ80StateAF,
  TZ80StateBC,
  TZ80StateData,
  TZ80StateDE,
  TZ80StateHL,
  TZ80StateInterruptMode,
  TZ80StateProps,
} from '@/emulator/core/z80/state'

const defaultState: TZ80StateData = {
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
}

export class Z80StateMock implements IZ80State {
  public a = 0
  public b = 0
  public c = 0
  public d = 0
  public e = 0
  public f = 0
  public h = 0
  public i = 0
  public l = 0
  public r = 0
  public ix = 0
  public iy = 0
  public sp = 0xffff
  public pc = 0x0000
  public iff1 = false
  public iff2 = false
  public shadowA = 0
  public shadowB = 0
  public shadowC = 0
  public shadowD = 0
  public shadowE = 0
  public shadowF = 0
  public shadowH = 0
  public shadowL = 0
  public halted = false
  public interruptMode: TZ80StateInterruptMode = 0

  private readonly initialState: TZ80StateData

  constructor({ state = {} }: TZ80StateProps = {}) {
    this.initialState = { ...defaultState, ...state }
    Object.assign(this, this.initialState)
  }

  public readonly reset = vi.fn(() => {
    Object.assign(this, this.initialState)
  })

  public set af(value: TZ80StateAF) {
    this.a = (value >> 8) & 0xff
    this.f = value & 0xff
  }

  public get af() {
    return ((this.a << 8) | this.f) & 0xffff
  }

  public set bc(value: TZ80StateBC) {
    this.b = (value >> 8) & 0xff
    this.c = value & 0xff
  }

  public get bc() {
    return ((this.b << 8) | this.c) & 0xffff
  }

  public set de(value: TZ80StateDE) {
    this.d = (value >> 8) & 0xff
    this.e = value & 0xff
  }

  public get de() {
    return ((this.d << 8) | this.e) & 0xffff
  }

  public set hl(value: TZ80StateHL) {
    this.h = (value >> 8) & 0xff
    this.l = value & 0xff
  }

  public get hl() {
    return ((this.h << 8) | this.l) & 0xffff
  }
}
