import { dayJS } from '_SRV/lib/day-js'

import { useFetcherNetworks } from '_STR/useFetcherNetworks'

export function Footer() {
  const networks = useFetcherNetworks((st) => st.data.list)
  const footerNetworks = networks.filter((network) => network.tags.includes('footer'))

  return (
    <footer className="relative z-10 mt-auto flex w-full flex-col items-center py-4 md:py-[calc(1.25rem+var(--spacing-safe-area-bottom))] lg:py-10">
      <div className="w-full">
        <div className="md:px-x-container mx-auto flex w-full flex-col items-center px-4 md:flex-row md:items-end md:gap-[clamp(0.5rem,2vw,2.5rem)]">
          <ul className="flex flex-1 gap-6 md:gap-10 lg:gap-14">
            {footerNetworks.map((network) => (
              <li key={network.id}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={network.path}
                  className="before:bg-black-900 relative text-lg font-medium before:absolute before:bottom-1.5 before:left-1/2 before:h-1 before:w-0 before:origin-center before:-translate-x-1/2 before:transition-all hover:before:w-[120%] md:text-xl xl:text-2xl"
                >
                  {network.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-md text-black-900 font-light md:text-lg lg:flex-1 lg:text-center lg:text-xl xl:text-left">
            Alex Madeira © {dayJS().format('YYYY')}
          </p>
        </div>
      </div>
    </footer>
  )
}
