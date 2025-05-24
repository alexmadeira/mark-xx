import { Helmet } from 'react-helmet-async'

import { Awards } from './sessions/awards'
import { Brands } from './sessions/brands'
import { Movie } from './sessions/movie'
import { Presentation } from './sessions/presentation'

export function About() {
  return (
    <>
      <Helmet title="Sobre" />
      <div className="w-full pt-[100px]">
        <div className="my-[clamp(1rem,_4vw,_5rem)] w-full">
          <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
            <h1 className="text-black-900 w-full text-[clamp(3rem,_12vw,_8rem)] leading-none tracking-widest">
              Alex Madeira
            </h1>
          </div>
        </div>
        <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
          <Presentation />
          <Movie />
          <Awards />
          <Brands />
        </div>
      </div>
    </>
  )
}
