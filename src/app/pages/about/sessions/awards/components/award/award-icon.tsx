import type { TAwardsAwardIconProps } from '@/props/pages/about/awards'

import { CircleStar, Newspaper, Star, Trophy } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function AwardIcon({ className, ...porps }: TAwardsAwardIconProps) {
  switch (porps.type) {
    case 'award':
      return <Trophy className={twMerge('text-yellow-500', className)} />
    case 'article':
      return <Newspaper className={twMerge('text-blue-400', className)} />
    case 'highlight':
      return <Star className={twMerge('fill-current text-amber-400', className)} />
    case 'honorable-mention':
      return <CircleStar className={twMerge('text-purple-500', className)} />
    default:
      return null
  }
}
