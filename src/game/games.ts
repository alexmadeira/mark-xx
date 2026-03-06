import { Game } from 'phaser'

import { Snake } from './snake'

export function snakeGame(parent: HTMLElement | string, tileSize: number, tileCount: number) {
  return new Game({
    parent,
    type: Phaser.AUTO,
    width: tileSize * tileCount,
    height: tileSize * tileCount,

    scene: new Snake(tileSize, tileCount).scenes(),

    // zoom: 2,
    // render: { antialias: false, pixelArt: true },
    // pixelArt: true,
    // roundPixels: true,
    // backgroundColor: '#000000',
  })
}
