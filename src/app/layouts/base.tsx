import { cloneElement } from 'react'
import {
  useLocation,
  // useLocation,
  useOutlet,
} from 'react-router-dom'

import { Footer } from '_APP/components/footer'
import { Header } from '_APP/components/header'
import { AnimatePresence, motion } from 'framer-motion'

// import { getRouteProps } from '_UTL/getter'

export function BaseLayout() {
  const { pathname } = useLocation()

  const element = useOutlet()
  // const props = getRouteProps(pathname)

  // const background = props?.color ? props.color[100] : 'transparent'

  // document.documentElement.style.setProperty('background', background)

  return (
    <div
      // style={{ background }}
      className="relative flex min-h-screen flex-col antialiased"
    >
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
