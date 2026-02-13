import _ from 'lodash'

import { useFetcherBrands } from '_STR/useFetcherBrands'
import { useFetcherPages } from '_STR/useFetcherPages'

import { Brand } from './components/brand'

export function Brands() {
  const about = useFetcherPages((st) => st.data.about)
  const brands = useFetcherBrands((st) => st.data.list)

  return (
    <div className="py-session w-full">
      <div className="md:px-x-container mx-auto flex max-w-500 flex-col gap-[clamp(0.5rem,1vw,2rem)] px-8">
        <h2 className="relative w-full text-4xl text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          {about.brandsTitle}
        </h2>
        <div
          className="text-[clamp(1rem,1.25vw,1.5rem)] leading-[clamp(1.5rem,2vw,2rem)] font-light text-current/60"
          dangerouslySetInnerHTML={{ __html: about?.brandsSubtitle }}
        />

        <div className="mt-[calc(clamp(0.5rem,1vw,2rem)*2)] flex w-full items-center">
          {brands.map((brand, i) => (
            <Brand key={brand.id} name={brand.name} logo={brand.logo} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
