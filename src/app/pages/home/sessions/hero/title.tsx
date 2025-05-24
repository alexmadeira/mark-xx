import { TypeAnimation } from 'react-type-animation'

import { heroBannerController } from '_SRV/controller'

export function Title() {
  const CHeroBanner = heroBannerController()

  return (
    <div className="relative z-1 mt-[clamp(1rem,_4vw,_5rem)] w-full flex-1">
      <div className="mx-auto flex w-full flex-1 flex-col gap-0 px-[clamp(1.25rem,_5vw,_5rem)]">
        <h1 className="text-[clamp(2.25rem,_7vw,_12rem)] leading-[clamp(2.5rem,_7vw,_8rem)] tracking-wider">
          Alex Madeira
        </h1>
        <h2 className="text-[clamp(1.125rem,_5vw,_6rem)] leading-[clamp(1.75rem,_5vw,_1)] font-light text-nowrap">
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
