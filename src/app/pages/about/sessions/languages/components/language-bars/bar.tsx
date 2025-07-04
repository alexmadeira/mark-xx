import type { TLanguagesBarProps } from '@/props/pages/about/languages'

import { useRef } from 'react'

import { useInView } from 'framer-motion'

export function Bar({ techology }: TLanguagesBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const barInView = useInView(barRef, { margin: '0px 0px -20% 0px' })

  const minWidth = barInView ? `${(techology.usage / 100) * 100}%` : `${100 / 7}%`

  return (
    <div
      ref={barRef}
      style={{ background: techology.color, minWidth }}
      className="relative z-0 h-full cursor-default transition-all duration-700 first:origin-left first:rounded-l-full last:origin-right last:rounded-r-full"
    />
  )
}
