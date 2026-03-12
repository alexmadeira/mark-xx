import type { TEmailEggProps } from '@/props/components/easter-eggs'

import { useEffect } from 'react'

import { useFloating } from '@floating-ui/react'
import { Portal } from '@radix-ui/react-portal'
import { twMerge } from 'tailwind-merge'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'
import { easterEggController } from '_SRV/controller'
import { timer } from '_SRV/utils'

import { useEasterEgg } from '_STR/useEasterEgg'

export function EmailEgg({ backDelay, onClickContent, children, className, ...rest }: TEmailEggProps) {
  const UTimer = timer()
  const BAnalytics = analytics()
  const CLEasterEgg = easterEggController()

  const { refs, floatingStyles } = useFloating({ placement: 'top', strategy: 'fixed' })

  const emailEgg = useEasterEgg((state) => state.data.eggs.email)
  const isCalled = emailEgg?.status === 'called'
  const showClickContent = isCalled && onClickContent

  useEffect(() => {
    if (!isCalled) return

    BAnalytics.trackEvent('EASTER_EGG_FOUND')
    BAnalytics.setUserProperties({ egg: 'email' })

    const backTime = UTimer.delay(() => CLEasterEgg.readEgg('email'), backDelay)

    return () => backTime()
  }, [isCalled])

  return (
    <>
      <button
        {...rest}
        ref={refs.setReference}
        className={twMerge('relative', className)}
        onClick={(e) => {
          if (isCalled) return

          interfaceEvent.emit('INTERFACE:ACTION:Email')

          CLEasterEgg.foundEgg('email')
          if (rest.onClick) rest.onClick(e)
        }}
      >
        {showClickContent ? onClickContent : children}
      </button>
      {isCalled && (
        <Portal>
          <div ref={refs.setFloating} style={floatingStyles} className="z-9">
            <div className="animate-coinJump absolute left-1/2 flex aspect-square h-[clamp(2.5rem,4vw,6rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span className="animate-coin h-full w-full bg-[url('/img/coin-sprite.png')] bg-size-[700%_100%] bg-left bg-no-repeat" />
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
