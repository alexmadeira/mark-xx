import _ from 'lodash'

import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

import { Bar } from './bar'

export function LanguageBars() {
  const usageLanguages = useFetcherUsageLanguages((st) => st.data.list)

  return (
    <ul className="flex h-4 w-full">
      {usageLanguages.map((techology) => (
        <Bar key={techology.name} {...techology} />
      ))}
    </ul>
  )
}
