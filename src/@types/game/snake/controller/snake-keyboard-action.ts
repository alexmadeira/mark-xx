import { ZEkeyboardAllKey } from '@GAMETypes/enums/keyboard'
import { ZESnakeAction } from '@GAMETypes/enums/snake'
import { ZSnakeGameInput } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeKeyboardActionKeyboard = ZSnakeGameInput
export const ZSnakeKeyActions = z.partialRecord(ZEkeyboardAllKey, ZESnakeAction)
export const ZSnakeKeyboardActionInitProps = z.tuple([ZSnakeKeyboardActionKeyboard])

//
//
//

export type TSnakeKeyboardActionKeyboard = z.infer<typeof ZSnakeKeyboardActionKeyboard>
export type TSnakeKeyActions = z.infer<typeof ZSnakeKeyActions>
export type TSnakeKeyboardActionInitProps = z.infer<typeof ZSnakeKeyboardActionInitProps>
