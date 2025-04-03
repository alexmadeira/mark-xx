import { Helmet } from 'react-helmet-async'

import { Hero } from './components/hero'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <div className="relative">
        <Hero />
      </div>
    </>
  )
}
