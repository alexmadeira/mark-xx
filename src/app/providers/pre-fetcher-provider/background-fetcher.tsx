import { loader } from '_SRV/builder/loader'
import { preFetcher, projectFetcher } from '_SRV/fetcher'

import { useFetcherProjects } from '_STR/useFetcherProjects.ts'

export function BackgroundFetcher() {
  const BLoader = loader()
  const FProject = projectFetcher()
  const FPreFetcher = preFetcher()

  BLoader.on('Loader:Finished', FPreFetcher.runBackground.bind(FPreFetcher))

  const projects = useFetcherProjects((st) => st.data.list['all:projects']) || []
  FPreFetcher.addBackgroundPrefetcher(projects.map((project) => FProject.prefetch(project.slug)))

  return null
}
