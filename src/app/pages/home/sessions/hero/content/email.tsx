import { useState } from 'react'

import copy from 'copy-to-clipboard'
import _ from 'lodash'
import useSound from 'use-sound'

import { timer } from '_SRV/utils'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function Email() {
  const UTimer = timer()
  const [copied, setCopied] = useState(false)

  const networks = useFetcherNetworks((st) => st.data.list)
  const bannerNetworks = networks.filter((network) => network.tags.includes('banner'))

  const email = _.find(bannerNetworks, (network) => network.tags.includes('email'))

  const [play] = useSound(
    'https://res.cloudinary.com/dgoi1pk8i/video/upload/v1771593717/super-mario-coin-sound_otcalt.mp3',
    {
      volume: 0.8,
      interrupt: true,
      preload: true,
    },
  )

  return (
    <button
      type="button"
      className="cursor-pointer text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline"
      onClick={() => {
        if (copied) return
        copy(email?.path || '')
        play()
        setCopied(true)
        UTimer.delay(() => setCopied(false), 1000)
      }}
    >
      {!copied ? email?.name : 'E-mail copiado!'}
    </button>
  )
}
