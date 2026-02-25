import type { GameObjects, Input, Scene } from 'phaser'

import { z } from 'zod/v4'

export const ZSnakeGameScene = z.custom<Scene>()

export const ZSnakeGameFood = z.custom<GameObjects.Rectangle>()
export const ZSnakeGameInput = z.custom<Input.Keyboard.KeyboardPlugin>()
export const ZSnakeGamePlayer = z.custom<GameObjects.Rectangle>()
export const ZSnakeGamePlayerSegment = z.custom<GameObjects.Rectangle>()

//
//
//
//

export type TSnakeGameScene = z.infer<typeof ZSnakeGameScene>

export type TSnakeGameFood = z.infer<typeof ZSnakeGameFood>
export type TSnakeGameInput = z.infer<typeof ZSnakeGameInput>
export type TSnakeGamePlayer = z.infer<typeof ZSnakeGamePlayer>
export type TSnakeGamePlayerSegment = z.infer<typeof ZSnakeGamePlayerSegment>
