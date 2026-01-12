import { useEffect } from 'react'
import { useLocation } from 'react-use'

import { useAnimate } from 'motion/react'

import { colorController, overlapController } from '_SRV/controller'

import { usePageConfigs } from '_STR/usePageConfigs'

export function PageColors() {
  const CLOverlap = overlapController()
  const CLTextColor = colorController('text')

  const location = useLocation()
  const [scope, animate] = useAnimate<HTMLDivElement>()

  const pages = usePageConfigs((st) => st.data.list)
  const background = location.pathname ? pages[location.pathname]?.background || '#FFFFFF' : '#FFFFFF'

  useEffect(() => {
    animate(scope.current, { background }, { duration: 0.5 })

    CLOverlap.addElement(scope.current, background)
  }, [background])

  CLTextColor.betterContrast('page', background)

  return <div ref={scope} className="fixed top-0 left-0 h-full w-full" />
}
