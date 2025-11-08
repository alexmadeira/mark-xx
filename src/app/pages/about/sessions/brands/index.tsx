import _ from 'lodash'

import { useFetcherBrands } from '_STR/useFetcherBrands'

import { Brand } from './components/brand'

export function Brands() {
  const brands = useFetcherBrands((st) => st.data.list)

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[2000px] flex-col gap-[clamp(1.5rem,5vw,3.5rem)] px-5 pb-20">
        <h2 className="mx-auto w-full text-center text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          Marcas atendidas
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-[clamp(0.5rem,2vw,2rem)]">
          {brands.map((brand) => (
            <Brand key={brand.id} name={brand.name} logo={brand.logo} />
          ))}
        </div>
      </div>
    </div>
  )
}
