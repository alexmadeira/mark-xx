import type { TESnakeGameState } from '@/enums/game/snake'
import type { Scene, Sound } from 'phaser'

import _ from 'lodash'

import { snakeEvent } from '_SRV/builder/event'

export class SoundSystem {
  private bgMusic?: Sound.BaseSound
  private eatSound?: Sound.BaseSound

  constructor() {
    _.bindAll(this, ['eat', 'background'])
  }

  private eat() {
    this.eatSound?.play({
      rate: Phaser.Math.FloatBetween(0.9, 1.1),
    })
  }

  private background(state: TESnakeGameState) {
    switch (state) {
      case 'MENU':
        this.bgMusic?.stop()
        break
      case 'RUNNING':
        !this.bgMusic?.isPlaying && this.bgMusic?.play()
        break
      case 'GAME_OVER':
        this.bgMusic?.stop()
        break
    }
  }

  public create(scene: Scene) {
    this.bgMusic = scene.sound.add('music', {
      loop: true,
      volume: 0.2,
    })

    this.eatSound = scene.sound.add('eat', {
      volume: 0.2,
    })

    snakeEvent.on('SNAKE:GAME_STATE:transition', this.background)
    snakeEvent.on('SNAKE:FOOD:consume', this.eat)
  }

  public destroy() {
    this.bgMusic?.destroy()
    this.eatSound?.destroy()

    snakeEvent.off('SNAKE:GAME_STATE:transition', this.background)
    snakeEvent.off('SNAKE:FOOD:consume', this.eat)
  }
}
