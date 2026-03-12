import { EmailEgg } from '_APP/easter-eggs/egg/email-egg'
import copy from 'copy-to-clipboard'
import _ from 'lodash'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function Email() {
  const networks = useFetcherNetworks((st) => st.data.list)
  const bannerNetworks = networks.filter((network) => network.tags.includes('banner'))

  const email = _.find(bannerNetworks, (network) => network.tags.includes('email'))

  return (
    <EmailEgg
      type="button"
      className="cursor-pointer text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline"
      backDelay={1000}
      onClickContent="E-mail copiado!"
      onClick={() => copy(email?.path || '')}
    >
      {email?.name}
    </EmailEgg>
  )
}
