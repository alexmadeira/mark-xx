import type { Game } from 'phaser'

import { snakeEvent } from '_SRV/builder/event'

export class GameController {
  private initialized = false

  init(game: Game) {
    if (this.initialized) return
    this.initialized = true

    game.scene.start('MENU')

    snakeEvent.on('SNAKE:GAME_STATE:transition', (state) => {
      console.log('Transitioning to state:', state)
      switch (state) {
        case 'MENU':
          game.scene.stop('GAME')
          game.scene.start('MENU')
          break

        // case 'GAME_OVER':
        //   game.scene.stop('GAME')
        //   game.scene.start('GAME')
        //   break

        case 'RUNNING':
          game.scene.stop('MENU')
          game.scene.start('GAME')
          break
      }
    })
  }
}
