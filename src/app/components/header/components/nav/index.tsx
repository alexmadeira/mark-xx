import { NavLink } from './nav-link'

export function Nav() {
  return (
    <nav className="ml-auto flex items-center justify-center gap-[clamp(0.75rem,3vw,5rem)]">
      <NavLink to="/projects">Projetos</NavLink>
      <NavLink to="/about">Sobre</NavLink>
    </nav>
  )
}
// <nav className="ml-auto flex items-center justify-center gap-30">
