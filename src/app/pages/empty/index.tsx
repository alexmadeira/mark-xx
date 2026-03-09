import { SnakeGame } from '_APP/games/snake'

export function Empty() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <SnakeGame />
      </div>
    </>
  )
}
