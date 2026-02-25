import { z } from 'zod/v4'

export function ZKeyMap<T>() {
  return z.record(z.string(), z.custom<T>())
}
export const ZKeyActionSetEventActionProps = z.tuple([z.custom<KeyboardEvent>()])

//
//
//
//

export type TKeyMap<T> = z.inferGeneric<typeof ZKeyMap<T>>
export type TKeyActionSetEventActionProps = z.infer<typeof ZKeyActionSetEventActionProps>
