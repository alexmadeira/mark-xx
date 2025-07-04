import { useRef } from 'react'

import { Building2, CalendarDays } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

export function Header() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-50%', '-50%', '0%'])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-50%', '-50%', '0%'])
  const top = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-60lvh', '-40lvh', '0lvh'])
  const left = useTransform(scrollYProgress, [0, 0.2, 0.5], ['50%', '50%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5], [2, 1.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  //   const CLElementHeader = elementController('header')
  // CLElementHeader.className = 'bg-black text-white'
  return (
    <div ref={targetRef} className="relative mt-[100vh] flex w-full flex-col gap-[clamp(0.5rem,1vw,2rem)]">
      <motion.h1
        style={{ scale, top, x, y, left, opacity }}
        className="relative w-fit pt-[10lvh] text-[clamp(2.25rem,7vw,12rem)] leading-[clamp(2.5rem,7vw,8rem)] text-nowrap"
      >
        Chilli Beans
      </motion.h1>

      <p className="flex flex-wrap gap-[clamp(1rem,1.25vw,1.85rem)] px-[clamp(0.375rem,1vw,1.5rem)] text-[clamp(0.8rem,1vw,1.5rem)] leading-[clamp(1.333rem,1vw,1.555rem)]">
        <span className="flex items-center justify-center gap-2">
          <CalendarDays className="w-[clamp(1rem,1.5vw,2rem)]" /> 2018
        </span>
        <span className="flex items-center justify-center gap-2">
          <Building2 className="w-[clamp(1rem,1.3vw,2rem)]" /> CoreBiz
        </span>
      </p>
    </div>
  )
}
