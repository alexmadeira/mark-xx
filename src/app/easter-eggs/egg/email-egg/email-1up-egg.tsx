import type { TEmail1UPEggProps } from '@/props/components/easter-eggs'

import { Portal } from '@radix-ui/react-portal'

export function Email1UpEgg(props: TEmail1UPEggProps) {
  return (
    <Portal>
      <div ref={props.ref} style={props.style} className="fixed top-1/2 left-1/2 z-9">
        <span className="animate-oneUp text-stroke-black text-stroke-[clamp(0.75rem,1.5vw,1.75rem)] font-pixel absolute left-1/2 h-34 -translate-x-1/2 text-[clamp(2rem,5vw,6rem)] leading-0 font-bold text-white">
          1UP
        </span>
      </div>
    </Portal>
  )
}
