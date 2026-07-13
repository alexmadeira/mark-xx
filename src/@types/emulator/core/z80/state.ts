import { z } from 'zod/v4'

export const ZZ80StateA = z.number()
export const ZZ80StateF = z.number()
export const ZZ80StateB = z.number()
export const ZZ80StateC = z.number()
export const ZZ80StateD = z.number()
export const ZZ80StateE = z.number()
export const ZZ80StateH = z.number()
export const ZZ80StateI = z.number()
export const ZZ80StateL = z.number()
export const ZZ80StateR = z.number()
export const ZZ80StateIx = z.number()
export const ZZ80StateIy = z.number()
export const ZZ80StateSp = z.number()
export const ZZ80StatePc = z.number()
export const ZZ80StateIff1 = z.boolean()
export const ZZ80StateIff2 = z.boolean()
export const ZZ80StateHalted = z.boolean()
export const ZZ80StateShadowA = z.number()
export const ZZ80StateShadowF = z.number()
export const ZZ80StateShadowB = z.number()
export const ZZ80StateShadowC = z.number()
export const ZZ80StateShadowD = z.number()
export const ZZ80StateShadowE = z.number()
export const ZZ80StateShadowH = z.number()
export const ZZ80StateShadowL = z.number()
export const ZZ80StateAF = z.number()
export const ZZ80StateBC = z.number()
export const ZZ80StateDE = z.number()
export const ZZ80StateHL = z.number()

export const ZZ80StateInterruptMode = z.literal([0, 1, 2])

export const ZZ80StateData = z.object({
  a: ZZ80StateA,
  f: ZZ80StateF,
  b: ZZ80StateB,
  c: ZZ80StateC,
  d: ZZ80StateD,
  e: ZZ80StateE,
  h: ZZ80StateH,
  i: ZZ80StateI,
  l: ZZ80StateL,
  r: ZZ80StateR,
  ix: ZZ80StateIx,
  iy: ZZ80StateIy,
  sp: ZZ80StateSp,
  pc: ZZ80StatePc,
  iff1: ZZ80StateIff1,
  iff2: ZZ80StateIff2,
  halted: ZZ80StateHalted,
  shadowA: ZZ80StateShadowA,
  shadowF: ZZ80StateShadowF,
  shadowB: ZZ80StateShadowB,
  shadowC: ZZ80StateShadowC,
  shadowD: ZZ80StateShadowD,
  shadowE: ZZ80StateShadowE,
  shadowH: ZZ80StateShadowH,
  shadowL: ZZ80StateShadowL,
  interruptMode: ZZ80StateInterruptMode,
})

export const ZZ80StateReset = z.custom<() => void>()

export const ZZ80StateProps = z.object({
  state: ZZ80StateData.partial().optional(),
})

export const ZZ80State = z.object({
  reset: ZZ80StateReset,
  a: ZZ80StateA,
  f: ZZ80StateF,
  b: ZZ80StateB,
  c: ZZ80StateC,
  d: ZZ80StateD,
  e: ZZ80StateE,
  h: ZZ80StateH,
  i: ZZ80StateI,
  l: ZZ80StateL,
  r: ZZ80StateR,
  ix: ZZ80StateIx,
  iy: ZZ80StateIy,
  sp: ZZ80StateSp,
  pc: ZZ80StatePc,
  iff1: ZZ80StateIff1,
  iff2: ZZ80StateIff2,
  halted: ZZ80StateHalted,
  shadowA: ZZ80StateShadowA,
  shadowF: ZZ80StateShadowF,
  shadowB: ZZ80StateShadowB,
  shadowC: ZZ80StateShadowC,
  shadowD: ZZ80StateShadowD,
  shadowE: ZZ80StateShadowE,
  shadowH: ZZ80StateShadowH,
  shadowL: ZZ80StateShadowL,
  interruptMode: ZZ80StateInterruptMode,
  af: ZZ80StateAF,
  bc: ZZ80StateBC,
  de: ZZ80StateDE,
  hl: ZZ80StateHL,
})

//
//
//

export type TZ80StateA = z.infer<typeof ZZ80StateA>
export type TZ80StateF = z.infer<typeof ZZ80StateF>
export type TZ80StateB = z.infer<typeof ZZ80StateB>
export type TZ80StateC = z.infer<typeof ZZ80StateC>
export type TZ80StateD = z.infer<typeof ZZ80StateD>
export type TZ80StateE = z.infer<typeof ZZ80StateE>
export type TZ80StateH = z.infer<typeof ZZ80StateH>
export type TZ80StateI = z.infer<typeof ZZ80StateI>
export type TZ80StateL = z.infer<typeof ZZ80StateL>
export type TZ80StateR = z.infer<typeof ZZ80StateR>
export type TZ80StateIx = z.infer<typeof ZZ80StateIx>
export type TZ80StateIy = z.infer<typeof ZZ80StateIy>
export type TZ80StateSp = z.infer<typeof ZZ80StateSp>
export type TZ80StatePc = z.infer<typeof ZZ80StatePc>
export type TZ80StateIff1 = z.infer<typeof ZZ80StateIff1>
export type TZ80StateIff2 = z.infer<typeof ZZ80StateIff2>
export type TZ80StateHalted = z.infer<typeof ZZ80StateHalted>
export type TZ80StateShadowA = z.infer<typeof ZZ80StateShadowA>
export type TZ80StateShadowF = z.infer<typeof ZZ80StateShadowF>
export type TZ80StateShadowB = z.infer<typeof ZZ80StateShadowB>
export type TZ80StateShadowC = z.infer<typeof ZZ80StateShadowC>
export type TZ80StateShadowD = z.infer<typeof ZZ80StateShadowD>
export type TZ80StateShadowE = z.infer<typeof ZZ80StateShadowE>
export type TZ80StateShadowH = z.infer<typeof ZZ80StateShadowH>
export type TZ80StateShadowL = z.infer<typeof ZZ80StateShadowL>
export type TZ80StateAF = z.infer<typeof ZZ80StateAF>
export type TZ80StateBC = z.infer<typeof ZZ80StateBC>
export type TZ80StateDE = z.infer<typeof ZZ80StateDE>
export type TZ80StateHL = z.infer<typeof ZZ80StateHL>
export type TZ80StateInterruptMode = z.infer<typeof ZZ80StateInterruptMode>

export type TZ80StateData = z.infer<typeof ZZ80StateData>
export type TZ80StateReset = z.infer<typeof ZZ80StateReset>

export type TZ80StateProps = z.infer<typeof ZZ80StateProps>
export interface IZ80State extends z.infer<typeof ZZ80State> {}
