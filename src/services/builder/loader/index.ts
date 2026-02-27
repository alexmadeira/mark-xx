import { mediaEvent } from '_SRV/builder/event'
import { timer } from '_SRV/utils'

import { LoaderBuilder } from './loader-builder'
import { LoaderMedias } from './loader-medias'
import { LoaderRequests } from './loader-requests'

let mediasLoader: LoaderMedias
let requestsLoader: LoaderRequests
let builderLoader: LoaderBuilder

function loaderMedias() {
  if (!mediasLoader) mediasLoader = new LoaderMedias(mediaEvent())
  return mediasLoader
}

export function loaderRequests() {
  if (!requestsLoader) requestsLoader = new LoaderRequests()
  return requestsLoader
}

export function loader() {
  if (!builderLoader) {
    builderLoader = new LoaderBuilder(loaderMedias(), loaderRequests(), timer(), {
      once: true,
    })
  }

  return builderLoader
}
