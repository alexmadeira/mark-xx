import type { TEmailEggProps } from '@/props/components/easter-eggs'

import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'
import { easterEggController } from '_SRV/controller'
import { timer } from '_SRV/utils'

import { useEasterEgg } from '_STR/useEasterEgg'

export function EmailEgg({ backDelay, onClickContent, children, ...rest }: TEmailEggProps) {
  const UTimer = timer()
  const BAnalytics = analytics()
  const CLEasterEgg = easterEggController()

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
    <button
      {...rest}
      onClick={(e) => {
        if (isCalled) return

        interfaceEvent.emit('INTERFACE:ACTION:Email')

        CLEasterEgg.foundEgg('email')
        if (rest.onClick) rest.onClick(e)
      }}
    >
      {showClickContent ? onClickContent : children}
    </button>
  )
}
