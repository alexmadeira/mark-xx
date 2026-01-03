import { Awards } from './sessions/awards'
import { Brands } from './sessions/brands'
import { Languages } from './sessions/languages'
import { Movie } from './sessions/movie'
import { Header } from './header'

export function About() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
        <Movie />
        <Awards />
        <Languages />
        <Brands />
      </div>
    </>
  )
}
