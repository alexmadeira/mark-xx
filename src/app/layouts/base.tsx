import { cloneElement, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { AnimatePresence, motion } from 'motion/react'

import { colorController, elementController, routeController } from '_SRV/controller'

export function BaseLayout() {
  const CLRoute = routeController()
  const CLLogoColor = colorController('logo')
  const CLTextColor = colorController('text')
  const CLHeaderElement = elementController('header')
  const CLNavigationColor = colorController('navigation')

  const { pathname } = useLocation()
  const element = useOutlet()

  CLRoute.setRoute(pathname)

  useEffect(() => {
    const route = CLRoute.getCurrent()

    CLLogoColor.default = route.color.twVar
    CLNavigationColor.default = route.color.twVar

    CLHeaderElement.setClassName(route.header?.className)
  }, [pathname])

  return (
    <div className="relative flex min-h-screen flex-col antialiased">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            ...CLTextColor.betterContrast(CLRoute.getRoute(pathname).color.twVar),
          }}
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
