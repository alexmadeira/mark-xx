import Phaser from 'phaser'

import { GameScene } from './snake/scene/game-scene'

export function createGame(container: string) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    parent: container,

    width: 320,
    height: 240,

    backgroundColor: '#000000',

    pixelArt: true,
    roundPixels: true,

    zoom: 2,

    scene: [GameScene],

    render: {
      antialias: false,
      pixelArt: true,
    },
  }

  return new Phaser.Game(config)
}
