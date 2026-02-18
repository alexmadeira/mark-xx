import { useLocation, useOutlet } from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { EasterEggs } from '_APP/easter-eggs'
import { BackgroundLoader } from '_APP/loader/background-loader'
import { SplashScreen } from '_APP/loader/splash-screen'
import { AnimatePresence, motion } from 'motion/react'

import { routeController, scrollingController } from '_SRV/controller'

export function BaseLayout() {
  const CLRoute = routeController()
  const CLScrolling = scrollingController()

  const { pathname } = useLocation()
  const element = useOutlet()

  CLRoute.setRoute(pathname)

  return (
    <>
      <SplashScreen />
      <BackgroundLoader />
      <EasterEggs />
      <div className="relative flex min-h-screen flex-col antialiased">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={pathname}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onAnimationStart={CLScrolling.fromStart}
            onAnimationComplete={CLScrolling.resize}
            className="absolute top-0 left-0 z-5 flex min-h-full w-full flex-col text-(--page-foreground-color)"
          >
            <Header />
            {element}
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
