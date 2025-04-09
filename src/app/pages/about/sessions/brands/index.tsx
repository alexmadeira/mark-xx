import _ from 'lodash'

import { Brand } from './components/brand'

export function Brands() {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[2000px] flex-col gap-[clamp(1.5rem,5vw,3.5rem)] px-5">
        <h2 className="text-black-900 mx-auto w-full text-center text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)]">
          Marcas atendidas
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-[clamp(0.5rem,_2vw,_2rem)]">
          {_.range(10).map((i) => (
            <Brand index={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
