import { Helmet } from 'react-helmet-async'

import { Header } from './sessions/header'
import { Informations } from './sessions/informations'

export function Project() {
  return (
    <>
      <Helmet title="Project" />
      <div className="fixed top-0 left-0 h-[100vh] max-h-[200vw] min-h-[400px] w-full">
        <div className="bg-web-50 h-full w-full overflow-hidden">
          <img src="/img/temp/projects/chilli-beans.jpg" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="px-x-container relative top-0 left-0 z-2 w-full pt-[60vh] text-white">
        <Header />
        <Informations />
      </div>
    </>
  )
}
