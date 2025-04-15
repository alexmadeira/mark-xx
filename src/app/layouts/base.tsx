import { cloneElement } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { AnimatePresence, motion } from 'motion/react'

import { AboutParticles } from '_SRV/builder/particle'
import { routeController, scrollController } from '_SRV/controller'

export function BaseLayout() {
  const ScrollController = scrollController()
  const RouteController = routeController()
  const { pathname } = useLocation()
  const element = useOutlet()

  RouteController.setRoute(pathname)
  ScrollController.scrollTo(0, { immediate: true })

  return (
    <div className="relative flex min-h-screen flex-col antialiased">
      <Header />
      <AnimatePresence mode="sync" initial={false} onExitComplete={console.log}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: 'easeInOut' }}
          className="absolute top-0 left-0 z-5 flex min-h-full w-full flex-col"
          key={pathname}
        >
          {element && cloneElement(element)}
          <Footer />
        </motion.div>
      </AnimatePresence>
      <div className="fixed top-0 left-0 z-1 min-h-full w-full">
        <div className="bg-mark-200/40 absolute top-0 left-0 z-1 h-full w-full backdrop-blur-3xl" />
        <AboutParticles.canvas className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full" />
      </div>
    </div>
  )
}
