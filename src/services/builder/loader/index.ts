import { LoaderBuilder } from './loader-builder'
import { LoaderMedias } from './loader-medias'
import { LoaderRequests } from './loader-requests'

let builderLoader: LoaderBuilder

export function loader() {
  if (!builderLoader)
    builderLoader = new LoaderBuilder(LoaderRequests.create(), LoaderMedias.create(), {
      once: true,
    })

  return builderLoader
}
