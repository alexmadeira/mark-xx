import { z } from 'zod/v4'

import { ZSchemaEasterEgg } from '../schema/easter-egg'

export const ZEasterEggEgg = ZSchemaEasterEgg
export const ZEasterEggAddEggProps = ZEasterEggEgg
export const ZEasterEggAddEggsProps = ZEasterEggEgg.array()

export function ZEasterEggEggName<TEggs extends z.infer<typeof ZEasterEggEgg>[]>() {
  return z.custom<TEggs[number]['name'] | (string & Record<never, never>)>()
}
export function ZEasterEggReadEggProps<TEggs extends z.infer<typeof ZEasterEggEgg>[]>() {
  return z.tuple([ZEasterEggEggName<TEggs>()])
}
export function ZEasterEggFoundEggProps<TEggs extends z.infer<typeof ZEasterEggEgg>[]>() {
  return z.tuple([ZEasterEggEggName<TEggs>() || z.custom<string>()])
}
export function ZEasterEggDispatchEggProps<TEggs extends z.infer<typeof ZEasterEggEgg>[]>() {
  return z.tuple([ZEasterEggEggName<TEggs>()])
}

//
//
//

export type TEasterEggEgg = z.infer<typeof ZEasterEggEgg>
export type TEasterEggAddEggProps = z.infer<typeof ZEasterEggAddEggProps>
export type TEasterEggAddEggsProps = z.infer<typeof ZEasterEggAddEggsProps>

export type TEasterEggEggName<T extends TEasterEggEgg[]> = z.inferGeneric<typeof ZEasterEggEggName<T>>
export type TEasterEggReadEggProps<T extends TEasterEggEgg[]> = z.inferGeneric<typeof ZEasterEggReadEggProps<T>>
export type TEasterEggFoundEggProps<T extends TEasterEggEgg[]> = z.inferGeneric<typeof ZEasterEggFoundEggProps<T>>
export type TEasterEggDispatchEggProps<T extends TEasterEggEgg[]> = z.inferGeneric<typeof ZEasterEggDispatchEggProps<T>>
