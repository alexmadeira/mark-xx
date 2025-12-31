import { LoaderBuilder } from './loader-builder'
import { LoaderMedias } from './loader-medias'
import { LoaderProgress } from './loader-progress'
import { LoaderRequests } from './loader-requests'

let builderLoader: LoaderBuilder

export function loader() {
  if (!builderLoader)
    builderLoader = new LoaderBuilder(LoaderRequests.create(), LoaderMedias.create(), LoaderProgress.create(), {
      once: true,
    })

  return builderLoader
}
