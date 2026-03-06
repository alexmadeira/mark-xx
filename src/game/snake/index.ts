import { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'
import { GameState } from '_GAME/snake/game-state'
import { SnakeCollision } from '_GAME/snake/services/snake-collision'

import { BootScene } from './scene/boot-scene'
import { EndScene } from './scene/end-scene'
import { GameScene } from './scene/game-scene'
import { MenuScene } from './scene/menu-scene'
import { GameController } from './game-controller'

export class Snake {
  private readonly gameState!: GameState
  private readonly gameLogic!: Game
  private readonly food!: SnakeFood
  private readonly player!: SnakePlayer
  private readonly collision!: SnakeCollision
  private readonly gameRender!: GameRender
  private readonly keyboardInput!: SnakeKeyboardInput
  private readonly gameController!: GameController

  constructor(
    private readonly tileSize: number,
    private readonly tileCount: number,
  ) {
    const startPosition = { x: Math.floor(this.tileCount / 2), y: Math.floor(this.tileCount / 2) }

    this.keyboardInput = new SnakeKeyboardInput()

    this.gameState = new GameState('MENU', {
      MENU: ['RUNNING'],
      RUNNING: ['GAME_OVER', 'MENU'],
      GAME_OVER: ['MENU', 'RUNNING'],
    })

    this.keyboardInput = new SnakeKeyboardInput()

    this.food = new SnakeFood({
      tileSize: this.tileSize,
      gridWidth: this.tileCount,
      gridHeight: this.tileCount,
    })

    this.player = new SnakePlayer({
      position: startPosition,
      tileSize: this.tileSize,
    })

    this.collision = new SnakeCollision({
      snake: this.player,
      maxWidth: this.tileCount,
      maxHeight: this.tileCount,
    })

    this.gameLogic = new Game(this.gameState, this.collision, this.keyboardInput, this.food, this.player)
    this.gameRender = new GameRender(this.gameLogic, this.tileSize)
    this.gameController = new GameController()
  }

  public scenes() {
    return [
      new BootScene(this.gameController, this.keyboardInput),
      new GameScene(this.gameLogic, this.gameRender),
      new MenuScene(this.gameState),
      new EndScene(this.gameState),
    ]
  }
}
