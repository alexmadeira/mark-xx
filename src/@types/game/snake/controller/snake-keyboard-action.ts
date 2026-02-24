import type { ZESnakeAction } from '@GAMETypes/enums/snake'

import { ZKeyActionOf, ZKeyActions } from '@GAMETypes/core/keyboard-action'
import { ZSnakeGameInput } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeKeyboardActionKeyboard = ZSnakeGameInput

export const ZSnakeKeyActions = ZKeyActions<z.infer<typeof ZESnakeAction>>()

export const ZSnakeKeyboardActionInitProps = z.tuple([ZSnakeKeyboardActionKeyboard])

export function ZSnakeKeyDirection<T extends Record<string, string>>() {
  return ZKeyActionOf<T>()
}
export function ZSnakeOppositeDirection<T extends Record<string, string>>() {
  return z.record(ZKeyActionOf<T>(), ZKeyActionOf<T>())
}
export function ZSnakeKeyboardActionSetActionProps<T extends Record<string, string>>() {
  return z.tuple([ZSnakeKeyDirection<T>()])
}

//
//
//
//
export type TSnakeKeyboardActionKeyboard = z.infer<typeof ZSnakeKeyboardActionKeyboard>

export type TSnakeKeyActions = z.infer<typeof ZSnakeKeyActions>

export type TSnakeKeyboardActionInitProps = z.infer<typeof ZSnakeKeyboardActionInitProps>

export type TSnakeKeyDirection<T extends Record<string, string>> = z.inferGeneric<typeof ZSnakeKeyDirection<T>>
export type TSnakeOppositeDirection<T extends Record<string, string>> = z.inferGeneric<
  typeof ZSnakeOppositeDirection<T>
>
export type TSnakeKeyboardActionSetActionProps<T extends Record<string, string>> = z.inferGeneric<
  typeof ZSnakeKeyboardActionSetActionProps<T>
>
