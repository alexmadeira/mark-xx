import type { TEmail1UPEggProps } from '@/props/components/easter-eggs'

import { Portal } from '@radix-ui/react-portal'
import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'

export function Email1UpEgg({ floatingRef, ...props }: TEmail1UPEggProps) {
  const BAnalytics = analytics()

  useEffect(() => {
    interfaceEvent.emit('INTERFACE:Sound:lifeUp')
    BAnalytics.trackEvent('EASTER_EGG_FOUND:lifeUp')
  }, [])

  return (
    <Portal>
      <div {...props} ref={floatingRef} className="fixed top-1/2 left-1/2 z-9">
        <span className="animate-oneUp text-stroke-black text-stroke-[clamp(0.75rem,1.5vw,1.75rem)] font-pixel absolute left-1/2 h-34 -translate-x-1/2 text-[clamp(2rem,5vw,6rem)] leading-0 font-bold text-white">
          1UP
        </span>
      </div>
    </Portal>
  )
}
