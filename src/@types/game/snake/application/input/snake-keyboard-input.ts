import { ZEkeyboardAllKey } from '@GAMETypes/enums/keyboard'
import { ZESnakeAction } from '@GAMETypes/enums/snake'
import { ZSnakeGameInput } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeKeyboardInput = ZSnakeGameInput
export const ZSnakeKeyActions = z.partialRecord(ZEkeyboardAllKey, ZESnakeAction)
export const ZSnakeKeyboardInputInitProps = z.tuple([ZSnakeKeyboardInput])

//
//
//

export type TSnakeKeyboardInput = z.infer<typeof ZSnakeKeyboardInput>
export type TSnakeKeyActions = z.infer<typeof ZSnakeKeyActions>
export type TSnakeKeyboardInputInitProps = z.infer<typeof ZSnakeKeyboardInputInitProps>
