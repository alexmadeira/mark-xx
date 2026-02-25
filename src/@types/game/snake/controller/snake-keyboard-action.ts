import { ZEkeyboardAllKey } from '@GAMETypes/enums/keyboard'
import { ZESnakeAction, ZESnakeDirection } from '@GAMETypes/enums/snake'
import { ZSnakeGameInput } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeKeyboardActionKeyboard = ZSnakeGameInput

export const ZSnakeKeyDire = ZESnakeDirection
export const ZSnakeKeyActions = z.partialRecord(ZEkeyboardAllKey, ZESnakeAction)

export const ZSnakeKeyboardActionInitProps = z.tuple([ZSnakeKeyboardActionKeyboard])

export function ZSnakeOppositeDirection<T extends Record<string, string>>() {
  return z.record(z.custom<T[keyof T]>(), z.custom<T[keyof T]>())
}

//
//
//

export type TSnakeKeyboardActionKeyboard = z.infer<typeof ZSnakeKeyboardActionKeyboard>
export type TSnakeKeyboardActionInitProps = z.infer<typeof ZSnakeKeyboardActionInitProps>
export type TSnakeKeyActions = z.infer<typeof ZSnakeKeyActions>
