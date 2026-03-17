import type { TEmailEggProps } from '@/props/components/easter-eggs'

import { useEffect, useRef } from 'react'

import { useFloating } from '@floating-ui/react'
import { twMerge } from 'tailwind-merge'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'
import { easterEggController } from '_SRV/controller'
import { timer } from '_SRV/utils'

import { useEasterEgg } from '_STR/useEasterEgg'

import { Email1UpEgg } from './email-1up-egg'
import { EmailCoinEgg } from './email-coin-egg'

export function EmailEgg({ backDelay, onClickContent, children, className, ...rest }: TEmailEggProps) {
  const UTimer = timer()
  const BAnalytics = analytics()
  const CLEasterEgg = easterEggController()

  const { refs, floatingStyles } = useFloating({ placement: 'top', strategy: 'fixed' })
  const clickCount = useRef(0)

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
          clickCount.current++
          if (isCalled) return
          interfaceEvent.emit('INTERFACE:ACTION:Email')
          CLEasterEgg.foundEgg('email')

          if (clickCount.current < 5) interfaceEvent.emit('INTERFACE:ACTION:coin')
          if (clickCount.current === 5) {
            clickCount.current = -1
            interfaceEvent.emit('INTERFACE:ACTION:LiveUp')
            BAnalytics.trackEvent('EASTER_EGG_FOUND')
            BAnalytics.setUserProperties({ egg: 'liveUp' })
          }

          if (rest.onClick) rest.onClick(e)
        }}
      >
        {showClickContent ? onClickContent : children}
      </button>

      {isCalled && clickCount.current >= 0 && <EmailCoinEgg ref={refs.setFloating} style={floatingStyles} />}
      {isCalled && clickCount.current < 0 && <Email1UpEgg ref={refs.setFloating} style={floatingStyles} />}
    </>

    //
  )
}
