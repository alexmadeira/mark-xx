import type { TEmailCoinEggProps } from '@/props/components/easter-eggs'

import { Portal } from '@radix-ui/react-portal'

export function EmailCoinEgg(props: TEmailCoinEggProps) {
  return (
    <Portal>
      <div {...props} className="fixed top-1/2 left-1/2 z-9">
        <div className="animate-coinJump absolute left-1/2 flex aspect-square h-[clamp(2.5rem,4vw,6rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="animate-coin h-full w-full bg-[url('/img/coin-sprite.png')] bg-size-[700%_100%] bg-left bg-no-repeat" />
        </div>
      </div>
    </Portal>
  )
}
