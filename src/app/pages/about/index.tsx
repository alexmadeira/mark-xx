import { Awards } from './sessions/awards'
import { Brands } from './sessions/brands'
import { Languages } from './sessions/languages'
import { Movie } from './sessions/movie'
import { Header } from './header'

export function About() {
  return (
    <>
      <Header />
      <div className="mt-session flex w-full flex-col">
        <Movie />
        <Awards />
        <Languages />
        <Brands />
      </div>
    </>
  )
}
