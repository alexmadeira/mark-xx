import { Helmet } from 'react-helmet-async'

import { scrollController } from '_SRV/controller'

export function Project() {
  const ScrollController = scrollController()
  ScrollController.scrollTo(0, { immediate: true })

  return (
    <>
      <Helmet title="Project" />
      <div className="relative">Project</div>
    </>
  )
}
