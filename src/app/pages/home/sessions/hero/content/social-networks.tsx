import _ from 'lodash'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function SocialNetworks() {
  const networks = useFetcherNetworks((st) => st.data.list)
  const bannerNetworks = networks.filter((network) => network.tags.includes('banner'))

  const socialNetworks = _.filter(bannerNetworks, (network) => !network.tags.includes('email'))

  return (
    <div className="flex w-full items-center justify-center gap-x-3 sm:justify-end">
      {socialNetworks.map((network) => (
        <a
          key={network.id}
          target="_blank"
          rel="noopener noreferrer"
          href={network.path}
          className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline"
        >
          {network.name}
        </a>
      ))}
    </div>
  )
}
