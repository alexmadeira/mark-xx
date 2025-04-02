import { cloneElement } from 'react'
import {
  // useLocation,
  useOutlet,
} from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'

// import { getRouteProps } from '_UTL/getter'

// import { Footer } from '~/components/Footer'
// import { Header } from '~/components/Header'

export function BaseLayout() {
  // const { pathname } = useLocation()

  const element = useOutlet()
  // const props = getRouteProps(pathname)

  // const background = props?.color ? props.color[100] : 'transparent'

  // document.documentElement.style.setProperty('background', background)

  return (
    <div
      // style={{ background }}
      className="relative flex min-h-screen flex-col antialiased"
    >
      {/* <Header /> */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.5, type: 'easeInOut' }}
        // className="absolute left-0 top-0 flex min-h-full w-full flex-col"
        // key={location.pathname}
        >
          {element && cloneElement(element)}
          {/* <Footer /> */}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
