import type { GameObjects, Input, Scene } from 'phaser'

import { ZESnakeDirection, ZESnakeGameState } from '@/enums/game/snake'

import { z } from 'zod/v4'

export const ZSnakeGameScene = z.custom<Scene>()

export const ZSnakeGameFood = z.custom<GameObjects.Image>()
export const ZSnakeGameInput = z.custom<Input.Keyboard.KeyboardPlugin>()
export const ZSnakeGamePlayer = z.custom<GameObjects.Image>()
export const ZSnakeGamePlayerSegment = z.custom<GameObjects.Image>()

export const ZSnakeGameEvents = z.object({
  'SNAKE:GAME_STATE:update': z.undefined(),
  'SNAKE:GAME_STATE:transition': ZESnakeGameState,
  //
  'SNAKE:PLAYER:render': z.undefined(),
  'SNAKE:PLAYER:update': z.undefined(),
  'SNAKE:PLAYER:updatePosition': z.undefined(),
  'SNAKE:PLAYER:updateDirection': z.undefined(),
  'SNAKE:PLAYER:kill': z.undefined(),
  'SNAKE:PLAYER:size': z.number(),
  'SNAKE:PLAYER:grow': z.undefined(),
  'SNAKE:PLAYER:alive': z.undefined(),
  'SNAKE:PLAYER:position': z.object({ x: z.number(), y: z.number() }),
  'SNAKE:PLAYER:direction': ZESnakeDirection,
  'SNAKE:PLAYER:collision': z.undefined(),
  'SNAKE:PLAYER:collisionWall': z.undefined(),
  'SNAKE:PLAYER:collisionWithSelf': z.undefined(),
  //
  'SNAKE:FOOD:render': z.undefined(),
  'SNAKE:FOOD:update': z.undefined(),
  'SNAKE:FOOD:updatePosition': z.undefined(),
  'SNAKE:FOOD:consume': z.undefined(),
  'SNAKE:FOOD:respawn': z.undefined(),
  'SNAKE:FOOD:position': z.object({ x: z.number(), y: z.number() }),
  //
  'SNAKE:OBJECT:render': z.undefined(),
  'SNAKE:OBJECT:update': z.undefined(),
  'SNAKE:OBJECT:updatePosition': z.undefined(),
  'SNAKE:OBJECT:position': z.object({ x: z.number(), y: z.number() }),
  //
  'SNAKE:TEXTURE:create': z.undefined(),
  'SNAKE:TEXTURE:render': z.undefined(),
  'SNAKE:TEXTURE:update': z.undefined(),
  //
  'SNAKE:SCORE:update': z.undefined(),
  'SNAKE:SCORE:value': z.number(),
})

//
//
//
//

export type TSnakeGameScene = z.infer<typeof ZSnakeGameScene>

export type TSnakeGameFood = z.infer<typeof ZSnakeGameFood>
export type TSnakeGameInput = z.infer<typeof ZSnakeGameInput>
export type TSnakeGamePlayer = z.infer<typeof ZSnakeGamePlayer>
export type TSnakeGamePlayerSegment = z.infer<typeof ZSnakeGamePlayerSegment>
export type TSnakeGameEvents = z.infer<typeof ZSnakeGameEvents>
