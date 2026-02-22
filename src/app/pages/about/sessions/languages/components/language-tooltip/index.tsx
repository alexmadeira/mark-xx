import type { TLanguageTooltipUsageProps } from '@/props/pages/about/languages'

import { useEffect, useState } from 'react'

import { Portal } from '@radix-ui/react-portal'
import _ from 'lodash'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { useFetcherRepositoryLanguages } from '_STR/useFetcherRepositoryLanguages'
import { useMouse } from '_STR/useMouse'

import { LanguageTooltipLibUsage } from './language-tooltip-lib-usage'

export function LanguageUsageTooltip({ className, language, ...props }: TLanguageTooltipUsageProps) {
  const [isHovered, setIsHovered] = useState(false)

  const mouseMove = useMouse((st) => st.data.document)
  const totalUsage = useFetcherRepositoryLanguages((st) => st.data.totalUsage)
  const percentage = (props.usage / totalUsage) * 100

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.5 })
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.5 })

  useEffect(() => {
    mouseX.set(mouseMove.x)
    mouseY.set(mouseMove.y)
  }, [mouseMove])

  useEffect(() => {
    if (!language) return

    language.addEventListener('mouseenter', () => setIsHovered(true))
    language.addEventListener('mouseleave', () => setIsHovered(false))

    return () => {
      language.addEventListener('mouseenter', () => setIsHovered(true))
      language.addEventListener('mouseleave', () => setIsHovered(false))
    }
  }, [language])

  if (!language || !isHovered) return null

  return (
    <Portal>
      <AnimatePresence>
        <motion.div
          key={props.id}
          style={{ left: smoothMouseX, top: smoothMouseY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={twMerge(
            'pointer-events-none fixed z-10 flex w-fit flex-1 -translate-y-full flex-col rounded-lg border border-zinc-400/20 bg-white p-[clamp(1rem,1vw,1.5rem)] shadow-lg',
            className,
          )}
        >
          <div className="flex flex-1 flex-col pb-[clamp(0.25rem,1vw,0.5rem)]">
            <p className="text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[clamp(1.25rem,2vw,2rem)] font-medium">
              {props.name}
            </p>
            <p className="pl-[clamp(0.5rem,1vw,0.75rem)] text-[clamp(0.5rem,1vw,1.125rem)] leading-[clamp(1.25rem,1.15vw,1.75rem)] font-light text-zinc-500/80">
              Em {_.roundMin(percentage, 1)}% dos projetos.
            </p>
          </div>
          <div className="grid w-full grid-cols-[min-content_1fr_min-content] flex-col gap-x-[clamp(0.5rem,1vw,0.75rem)] px-[clamp(0.5rem,1vw,0.75rem)]">
            {_.map(props.libs, (lib) => (
              <LanguageTooltipLibUsage key={lib.name} {...lib} totalUsage={props.usage} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  )
}
