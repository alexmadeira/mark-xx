import type { TPreFetcherRaw } from '_TEST/utils/factories/fetcher/make-pre-fetcher-raw'
import type { PreFetcherMapperMock } from '_TEST/utils/stubs/mapper/fake-pre-fetcher-mapper'
import type { FakePreFetcherStore } from '_TEST/utils/stubs/stores/fake-pre-fetcher-store'
import type { TFetcherPrefetch } from '@/interfaces/fetcher'

import { makePreFetcherRaw } from '_TEST/utils/factories/fetcher/make-pre-fetcher-raw'

export type TMakePreFetcherProps = {
  key?: string
  name?: string
  tags?: string[]
}

export type TMakePreFetcherDeps = {
  mapper: PreFetcherMapperMock
  store: FakePreFetcherStore
}

export type TMakePreFetcherResult = TFetcherPrefetch & {
  fetch: ReturnType<typeof vi.fn>
  raw: TPreFetcherRaw
}

export function makePreFetcher(props: TMakePreFetcherProps = {}, deps: TMakePreFetcherDeps): TMakePreFetcherResult {
  const raw = makePreFetcherRaw({
    name: props.name,
    tags: props.tags,
  })

  const fetchSpy = vi.fn(async () => {
    const mapped = deps.mapper.toStore(raw)
    const key = props.key || raw.name

    deps.store.actions.setList(key, [mapped])
  })

  return {
    name: raw.name,
    tags: raw.tags,
    fetch: fetchSpy,
    raw,
  }
}
