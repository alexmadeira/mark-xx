import { useFloating } from '@floating-ui/react'
import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'
import { easterEggController } from '_SRV/controller'
import { timer } from '_SRV/utils'
import { useEasterEgg } from '_STR/useEasterEgg'

import { Email1UpEgg } from './email-1up-egg'
import { EmailCoinEgg } from './email-coin-egg'

export function EmailEgg() {
  const UTimer = timer()
  const BAnalytics = analytics()
  const CLEasterEgg = easterEggController()

  const { refs, floatingStyles } = useFloating({
    placement: 'top',
  })

  const emailEgg = useEasterEgg((state) => state.data.eggs.email)
  const lifeUp = emailEgg?.called % 5 === 0
  const isCalled = emailEgg?.status === 'called'

  useEffect(() => {
    refs.setReference(document.querySelector('#email-easter-egg-reference'))
  }, [refs])

  useEffect(() => {
    if (!isCalled) return

    BAnalytics.trackEvent('EASTER_EGG_FOUND:email')

    const backTime = UTimer.delay(() => CLEasterEgg.readEgg('email'), 500)
    return () => backTime()
  }, [isCalled])

  if (!isCalled) return null

  if (lifeUp) return <Email1UpEgg style={floatingStyles} floatingRef={refs.setFloating} />

  return <EmailCoinEgg style={floatingStyles} floatingRef={refs.setFloating} />
}
