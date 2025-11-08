import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

import { UsageDetail } from './usage-detail'

export function LanguageUsage() {
  const usageLanguages = useFetcherUsageLanguages((st) => st.data.list)
  return (
    <ul className="flex w-full flex-wrap">
      {usageLanguages.map((techology) => (
        <UsageDetail key={techology.name} {...techology} />
      ))}
    </ul>
  )
}
