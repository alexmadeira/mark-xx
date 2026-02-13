import { loader } from '_SRV/builder/loader'
import { preFetcher, projectFetcher, repositoryLanguagesFetcher } from '_SRV/fetcher'

import { useFetcherProjects } from '_STR/useFetcherProjects.ts'
import { useFetcherRepositories } from '_STR/useFetcherRepositories'

export function BackgroundFetcher() {
  const BLoader = loader()
  const FProject = projectFetcher()
  const FRepositoryLanguages = repositoryLanguagesFetcher()
  const FPreFetcher = preFetcher()

  BLoader.on('Loader:Finished', FPreFetcher.runBackground.bind(FPreFetcher))

  const projects = useFetcherProjects((st) => st.data.list['all:projects']) || []
  const repositories = useFetcherRepositories((st) => st.data.list)

  FPreFetcher.addBackgroundPrefetcher(projects.map((project) => FProject.prefetch(project.slug)))
  FPreFetcher.addBackgroundPrefetcher(
    repositories.map((repository) =>
      FRepositoryLanguages.prefetch(repository.name, {
        params: { owner: repository.owner, name: repository.name },
      }),
    ),
  )

  return null
}
