import { cloneElement } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { AnimatePresence, motion } from 'framer-motion'

import { routeController, scrollController } from '_SRV/controller'

export function BaseLayout() {
  const ScrollController = scrollController()
  const RouteController = routeController()

  const { pathname } = useLocation()
  const element = useOutlet()

  RouteController.setRoute(pathname)
  ScrollController.scrollTo(0, { duration: 0.5 })

  return (
    <div className="relative flex min-h-screen flex-col antialiased">
      <Header />
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: 'easeInOut' }}
          className="absolute top-0 left-0 flex min-h-full w-full flex-col"
          key={pathname}
        >
          {element && cloneElement(element)}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
