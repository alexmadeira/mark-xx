import { Game } from 'phaser'

import { Snake } from './snake'

export function snakeGame(parent: HTMLElement | string, tileSize: number, tileCount: number) {
  return new Game({
    parent,
    roundPixels: true,
    backgroundColor: '#000000',
    type: Phaser.AUTO,
    width: tileSize * tileCount,
    height: tileSize * tileCount,
    scene: new Snake(tileSize, tileCount).scenes(),
  })
}
