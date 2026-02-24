import { ZEkeyboardAllKey } from '@GAMETypes/enums/keyboard'
import { z } from 'zod/v4'

export const ZKeyMap = z.record(z.string(), z.string())

export const ZKeyActionSetEventActionProps = z.tuple([z.custom<KeyboardEvent>()])

export function ZKeyActions<T extends string = string>() {
  return z.partialRecord(ZEkeyboardAllKey, z.custom<T>())
}
export function ZKeyActionOf<T extends Record<string, string>>() {
  return z.custom<T[keyof T]>()
}
export function ZKeyActionSetActionProps<T extends z.inferGeneric<typeof ZKeyActions>>() {
  return z.tuple([ZKeyActionOf<T>()])
}
export function ZKeyActionProps<T extends z.inferGeneric<typeof ZKeyActions>>() {
  return z.object({
    keyMap: z.custom<T>(),
  })
}
//
//
//
//

export type TKeyMap = z.infer<typeof ZKeyMap>

export type TKeyActionSetEventActionProps = z.infer<typeof ZKeyActionSetEventActionProps>

export type TKeyActions<T extends string = string> = z.inferGeneric<typeof ZKeyActions<T>>
export type TKeyActionOf<T extends Record<string, string>> = z.inferGeneric<typeof ZKeyActionOf<T>>

export type TKeyActionSetActionProps<T extends Record<string, string>> = z.inferGeneric<
  typeof ZKeyActionSetActionProps<T>
>
export type TKeyActionProps<T extends TKeyActions> = z.inferGeneric<typeof ZKeyActionProps<T>>
