import type { TEmailCoinEggProps } from '@/props/components/easter-eggs'

import { Portal } from '@radix-ui/react-portal'
import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'

export function EmailCoinEgg({ floatingRef, ...props }: TEmailCoinEggProps) {
  const BAnalytics = analytics()

  useEffect(() => {
    interfaceEvent.emit('INTERFACE:Sound:coin')
    BAnalytics.trackEvent('EASTER_EGG_FOUND:coin')
  }, [])

  return (
    <Portal>
      <div {...props} ref={floatingRef} className="fixed top-1/2 left-1/2 z-9">
        <div className="animate-coinJump absolute left-1/2 flex aspect-square h-[clamp(2.5rem,4vw,6rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="animate-coin h-full w-full bg-[url('/img/coin-sprite.png')] bg-size-[700%_100%] bg-left bg-no-repeat" />
        </div>
      </div>
    </Portal>
  )
}
