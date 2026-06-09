import { z } from 'zod/v4'

import { ZEkeyboardAllKey } from '@/enums/game/keyboard'
import { ZESnakeAction } from '@/enums/game/snake'
import { ZSnakeGameInput } from '@GAMETypes/snake/game'

export const ZSnakeKeyboardInput = ZSnakeGameInput
export const ZSnakeKeyActions = z.partialRecord(ZEkeyboardAllKey, ZESnakeAction)
export const ZSnakeKeyboardInputInitProps = z.tuple([ZSnakeKeyboardInput])

//
//
//

export type TSnakeKeyboardInput = z.infer<typeof ZSnakeKeyboardInput>
export type TSnakeKeyActions = z.infer<typeof ZSnakeKeyActions>
export type TSnakeKeyboardInputInitProps = z.infer<typeof ZSnakeKeyboardInputInitProps>
