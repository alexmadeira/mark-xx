import { cloneElement } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { AnimatePresence, motion } from 'motion/react'

import { colorController, routeController } from '_SRV/controller'

export function BaseLayout() {
  const CLRoute = routeController()
  const CLLogoColor = colorController('logo')
  const CLTextColor = colorController('text')
  const CLNavigationColor = colorController('navigation')

  const { pathname } = useLocation()
  const element = useOutlet()

  CLRoute.setRoute(pathname)

  CLLogoColor.default = CLRoute.currentRoute.color.twVar
  CLNavigationColor.default = CLRoute.currentRoute.color.twVar

  const colorStyle = CLTextColor.betterContrast(CLRoute.currentRoute.color.twVar, 'page')

  return (
    <div className="relative flex min-h-screen flex-col antialiased">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={CLRoute.currentRoute.pathname}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ ...colorStyle }}
          className="absolute top-0 left-0 z-5 flex min-h-full w-full flex-col"
        >
          <Header />
          {element && cloneElement(element)}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
