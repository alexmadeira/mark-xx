import { Helmet } from 'react-helmet-async'

import { Banner } from './sessions/banner'
import { Header } from './sessions/header'
import { Informations } from './sessions/informations'

export function Project() {
  return (
    <>
      <Helmet title="Project" />
      <Banner />
      <div className="px-x-container relative top-0 left-0 z-2 w-full">
        <Header />
        <Informations />
      </div>
    </>
  )
}
