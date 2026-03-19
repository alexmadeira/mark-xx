import { Action } from '_APP/components/ui-element/action'
import _ from 'lodash'

import { interfaceEvent } from '_SRV/builder/event'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function Email() {
  const networks = useFetcherNetworks((st) => st.data.list)
  const bannerNetworks = networks.filter((network) => network.tags.includes('banner'))

  const email = _.find(bannerNetworks, (network) => network.tags.includes('email'))

  return (
    <Action.copy
      type="button"
      id="email-easter-egg-reference"
      className="cursor-pointer text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline"
      value={email?.path || ''}
      backDelay={500}
      onClickContent="E-mail copiado!"
      onClick={() => {
        interfaceEvent.emit('INTERFACE:Hero:email')
      }}
    >
      {email?.name}
    </Action.copy>
  )
}
