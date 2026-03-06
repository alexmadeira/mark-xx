// import { SnakeKeyboardInput } from '../application/input/snake-keyboard-input'
// import { GameController } from '../game-controller'

// import { snakeEvent } from '_SRV/builder/event'

// export class BootScene extends Phaser.Scene {
//   constructor(
//     private controller: GameController,
//     private readonly keyboardInput: SnakeKeyboardInput,
//   ) {
//     super('BOOT')
//   }

//   create() {
//     console.log('Initializing keyboard input...')

//     this.keyboardInput.init(this.input.keyboard!)
//     this.controller.init(this.game)
//   }
// }

// export class BootScene extends Phaser.Scene {
//   constructor() {
//     super('BOOT')
//   }

//   create() {
//     setTimeout(() => {
//       snakeEvent.emit('SNAKE:GAME_STATE:transition', 'RUNNING')
//     }, 2000)
//     this.scene.start('MAIN')
//   }
// }

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BOOT')
  }

  create() {
    this.scene.start('MAIN')
  }
}
