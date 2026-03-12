// import { SnakeGame } from '_APP/games/snake'

export function Empty() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="animate-coinJump relative flex h-33.75 w-33.75 items-center justify-center">
          <span className="animate-coin h-33.75 w-33.75 bg-[url('/img/coin-sprite.png')] bg-no-repeat" />
        </div>
      </div>
    </>
  )
}
