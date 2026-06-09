import _ from 'lodash'

import { Action } from '_APP/components/ui-element/action'
import { interfaceEvent } from '_SRV/builder/event'
import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function Email() {
  const networks = useFetcherNetworks((st) => st.data.list)
  const bannerNetworks = networks.filter((network) => network.tags.includes('banner'))

  const email = _.find(bannerNetworks, (network) => network.tags.includes('email'))

  return (
    <Action.copy
      type="button"
      backDelay={500}
      value={email?.path || ''}
      id="email-easter-egg-reference"
      onClickContent="E-mail copiado!"
      onClick={() => {
        interfaceEvent.emit('INTERFACE:Hero:email')
      }}
      className="cursor-pointer text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline"
    >
      {email?.name}
    </Action.copy>
  )
}
