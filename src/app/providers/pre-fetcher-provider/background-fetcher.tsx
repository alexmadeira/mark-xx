import { loader } from '_SRV/builder/loader'
import {
  awardsFetcher,
  brandsFetcher,
  pageFetcher,
  preFetcher,
  projectFetcher,
  projectsFetcher,
  repositoriesFetcher,
  repositoryLanguagesFetcher,
} from '_SRV/fetcher'

import { useFetcherProjects } from '_STR/useFetcherProjects.ts'
import { useFetcherRepositories } from '_STR/useFetcherRepositories'

import { env } from '~/env'

export function BackgroundFetcher() {
  const BLoader = loader()

  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FBrands = brandsFetcher()
  const FProject = projectFetcher()
  const FProjects = projectsFetcher()
  const FRepositories = repositoriesFetcher()

  const FRepositoryLanguages = repositoryLanguagesFetcher()
  const FPreFetcher = preFetcher()

  BLoader.on('Loader:OnceFinished', () => {
    setTimeout(() => {
      FPreFetcher.runBackground() // FPreFetcher)
    }, 5000)
  })

  const projects = useFetcherProjects((st) => st.data.list['all:projects']) || []
  const repositories = useFetcherRepositories((st) => st.data.list)

  FPreFetcher.addBackgroundPrefetcher(projects.map((project) => FProject.prefetch(project.slug)))
  FPreFetcher.addBackgroundPrefetcher(FPage.prefetch('about'))
  FPreFetcher.addBackgroundPrefetcher(FPage.prefetch('projects'))
  FPreFetcher.addBackgroundPrefetcher(FAwards.prefetch('about:awards'))
  FPreFetcher.addBackgroundPrefetcher(FBrands.prefetch('about:brands'))
  FPreFetcher.addBackgroundPrefetcher(FProjects.prefetch('all:projects'))
  FPreFetcher.addBackgroundPrefetcher(
    FRepositories.prefetch('about:repositories', { params: { perPage: env.VITE_GITHUB_TOTAL_REPOSITORIES } }),
  )

  FPreFetcher.addBackgroundPrefetcher(
    repositories.map((repository) =>
      FRepositoryLanguages.prefetch(repository.name, {
        params: { owner: repository.owner, name: repository.name },
      }),
    ),
  )

  return null
}
