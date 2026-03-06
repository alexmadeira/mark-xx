import type { TESnakeGameState } from '@/enums/game/snake'

import { StateMachine } from '_GAME/core/application/state-machine'

import { snakeEvent } from '_SRV/builder/event'

export class GameState extends StateMachine<TESnakeGameState> {
  public transition(to: TESnakeGameState) {
    if (!super.transition(to)) return false
    snakeEvent.emit('SNAKE:GAME_STATE:update')
    snakeEvent.emit('SNAKE:GAME_STATE:transition', to)

    return true
  }
}
