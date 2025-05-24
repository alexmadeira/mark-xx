import { TypeAnimation } from 'react-type-animation'

import { heroBannerController } from '_SRV/controller'

export function Title() {
  const CHeroBanner = heroBannerController()

  return (
    <div className="relative z-1 mt-[clamp(1rem,4vw,5rem)] w-full flex-1">
      <div className="mx-auto flex w-full flex-1 flex-col gap-0 px-[clamp(1.25rem,5vw,5rem)]">
        <h1 className="text-[clamp(2.25rem,7vw,12rem)] leading-[clamp(2.5rem,7vw,8rem)] tracking-wider">
          Alex Madeira
        </h1>
        <h2 className="text-[clamp(1.125rem,5vw,6rem)] leading-[clamp(1.75rem,5vw,1)] font-light text-nowrap">
          Desenvolvedor{' '}
          <TypeAnimation
            cursor
            wrapper="span"
            preRenderFirstString
            repeat={Infinity}
            speed={CHeroBanner.speed}
            sequence={CHeroBanner.typingSequence}
            deletionSpeed={CHeroBanner.deletionSpeed}
          />
        </h2>
      </div>
    </div>
  )
}
