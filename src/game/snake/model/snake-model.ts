export type Position = { x: number; y: number }

export class SnakeModel {
  private body: Position[]

  constructor(initialPosition: Position) {
    this.body = [initialPosition]
  }

  getBody() {
    return this.body
  }

  getHead(): Position {
    return this.body[0]
  }

  move(newHead: Position, grow: boolean) {
    this.body.unshift(newHead)

    if (!grow) {
      this.body.pop()
    }
  }

  collidesWithSelf(): boolean {
    const [head, ...rest] = this.body

    return rest.some((segment) => segment.x === head.x && segment.y === head.y)
  }
}
