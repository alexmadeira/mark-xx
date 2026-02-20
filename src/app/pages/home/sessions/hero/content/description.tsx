import _ from 'lodash'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Description() {
  const description = useFetcherPages((st) => st.data.home?.description)
  return (
    <div
      className="flex flex-2 text-[clamp(1rem,1.4vw,2rem)] leading-[clamp(1.35rem,1.75vw,2.5rem)] font-light"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
}
