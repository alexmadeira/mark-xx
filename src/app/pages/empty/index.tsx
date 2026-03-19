// import { SnakeGame } from '_APP/games/snake'

export function Empty() {
  return (
    <>
      <div className="relative z-50 mx-auto my-[45vh] flex aspect-square w-[144px] items-center justify-center bg-amber-400">
        <span
          style={{ willChange: 'background-position' }}
          className="animate-sosnic h-full w-full bg-[url('/img/sonic_waiting.gif')]"
        />
      </div>
    </>
  )
}
