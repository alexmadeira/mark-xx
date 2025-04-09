import { dayJS } from '_SRV/lib/day-js'

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex w-full flex-col items-center px-10 py-10 md:pt-24 md:pb-10">
      <div className="w-full pt-10">
        <div className="mx-auto flex w-full flex-col items-center gap-[clamp(0.5rem,_2vw,_2.5rem)] px-[clamp(1.25rem,_5vw,_5rem)] md:flex-row md:items-end">
          <ul className="flex flex-1 gap-6 md:gap-10 lg:gap-14">
            <li>
              <a
                href="#"
                className="before:bg-black-900 relative text-lg font-medium before:absolute before:bottom-1.5 before:left-1/2 before:h-1 before:w-0 before:origin-center before:-translate-x-1/2 before:transition-all hover:before:w-[120%] md:text-xl xl:text-2xl"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="#"
                className="before:bg-black-900 relative text-lg font-medium before:absolute before:bottom-1.5 before:left-1/2 before:h-1 before:w-0 before:origin-center before:-translate-x-1/2 before:transition-all hover:before:w-[120%] md:text-xl xl:text-2xl"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="#"
                className="before:bg-black-900 relative text-lg font-medium before:absolute before:bottom-1.5 before:left-1/2 before:h-1 before:w-0 before:origin-center before:-translate-x-1/2 before:transition-all hover:before:w-[120%] md:text-xl xl:text-2xl"
              >
                Instagram
              </a>
            </li>
          </ul>
          <p className="text-md text-black-900 font-light md:text-lg lg:flex-1 lg:text-center lg:text-xl xl:text-left">
            Alex Madeira © {dayJS().format('YYYY')}
          </p>
        </div>
      </div>
    </footer>
  )
}
