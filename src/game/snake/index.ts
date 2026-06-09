import { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'
import { SnakeCollision } from '_GAME/snake/services/snake-collision'

import { GameController } from './game-controller'
import { BootScene } from './scene/boot-scene'
import { MainScene } from './scene/main-scene'
import { ScoreSystem } from './systems/score-system'

export class Snake {
  private readonly gameLogic!: Game
  private readonly food!: SnakeFood
  private readonly player!: SnakePlayer
  private readonly collision!: SnakeCollision
  private readonly gameRender!: GameRender
  private readonly scoreSystem!: ScoreSystem
  private readonly keyboardInput!: SnakeKeyboardInput
  private readonly gameController!: GameController

  constructor(
    private readonly tileSize: number,
    private readonly tileCount: number,
  ) {
    const startPosition = { x: Math.floor(this.tileCount / 2), y: Math.floor(this.tileCount / 2) }

    this.keyboardInput = new SnakeKeyboardInput()
    this.scoreSystem = new ScoreSystem()

    this.food = new SnakeFood({
      tileSize: this.tileSize,
      gridWidth: this.tileCount,
      gridHeight: this.tileCount,
    })

    this.player = new SnakePlayer({
      startPosition,
      tileSize: this.tileSize,
    })

    this.collision = new SnakeCollision({
      snake: this.player,
      maxWidth: this.tileCount,
      maxHeight: this.tileCount,
    })

    this.gameLogic = new Game(this.scoreSystem, this.collision, this.keyboardInput, this.food, this.player)
    this.gameRender = new GameRender(this.gameLogic, this.tileSize)
    this.gameController = new GameController(this.gameLogic, this.keyboardInput)

    this.gameLogic.setController(this.gameController)
  }

  public scenes() {
    return [
      new BootScene(),
      new MainScene(this.gameController, this.gameLogic, this.gameRender, this.scoreSystem, this.keyboardInput),
    ]
  }
}
