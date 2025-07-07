import type { TAwardsAwardProps } from '@/props/pages/about/awards'

import { Trophy } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function Award({ className, ...rest }: TAwardsAwardProps) {
  return (
    <li className="group relative flex w-full flex-col overflow-clip">
      <p className="relative flex items-center gap-4 py-[clamp(1rem,2vw,2rem)] pl-4 text-[clamp(1rem,3vw,1.25rem)] leading-[clamp(1.5rem,3vw,1.75rem)]">
        <Trophy className="group-hover:animate-shake h-[clamp(1.75rem,_2.7vw,_2.5rem)] w-[clamp(1.75rem,_2.7vw,_2.5rem)] text-yellow-500" />
        <span
          {...rest}
          className={twMerge('flex-1 origin-left transition duration-250 group-hover:scale-115', className)}
        />
      </p>
      <span className="h-[1px] w-full bg-black group-last:hidden" />
    </li>
  )
}
