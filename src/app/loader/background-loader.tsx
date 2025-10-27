// import type { LottieRefCurrentProps } from 'lottie-react'

// import { useEffect, useRef } from 'react'

// import Lottie from 'lottie-react'
// import { motion } from 'motion/react'

// import { loadingMotion } from '_CFG/motion/loading'

// import { useLoader } from '_STR/useLoader'

// export function BackgroundLoader() {
//   const logoRef = useRef<LottieRefCurrentProps>(null)

//   // const [scope, animate] = useAnimate<HTMLDivElement>()

//   const status = useLoader((st) => st.data.status)
//   const finishd = useLoader((st) => st.data.finishd)
//   const loaded = useLoader((st) => st.data.loaded)

//   const showCountUp = finishd && status === 'loading'

//   // async function onComplete() {
//   //   animate('#overlay', { opacity: 0 }, { ease: 'easeIn', duration: 0.5 })
//   //   await animate('#loader', { scale: 55 }, { ease: 'circIn', duration: 1 })
//   //   await animate(scope.current, { display: 'none' }, { duration: 0 })

//   //   CLScrolling.start()
//   // }

//   // useEffect(() => {
//   //   CLScrolling.none()

//   //   if (finishd && logoRef.current) {
//   //     logoRef.current.playSegments([hasLoaded ? 70 : 30, 120])
//   //     logoRef.current.play()
//   //   }
//   // }, [finishd, hasLoaded])

//   return (
//     <motion.div
//       variants={{
//         show: { opacity: 0.9, scale: 1 },
//         hide: { opacity: 0, scale: 0 },
//       }}
//       exit="hide"
//       initial="hide"
//       animate={showCountUp ? 'show' : 'hide'}
//       transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
//       id="background-loader"
//       className="fixed right-8 bottom-4 z-11 flex h-35 w-35 rounded-md border border-zinc-400/20 bg-white p-2 shadow-lg"
//     >
//       <Lottie
//         className="w-full [&_g]:!opacity-100"
//         lottieRef={logoRef}
//         animationData={loadingMotion}
//         // onComplete={() => finishd && onComplete()}
//         loop={true}
//         autoPlay={true}
//       />
//     </motion.div>
//   )
// }
