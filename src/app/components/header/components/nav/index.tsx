import { NavLink } from './nav-link'

export function Nav() {
  return (
    <nav className="ml-auto flex items-center justify-center gap-[clamp(0.75rem,3vw,5rem)]">
      <NavLink to="/projects" data-name="projects">
        Projetos
      </NavLink>
      <NavLink to="/about" data-name="about">
        Sobre
      </NavLink>
    </nav>
  )
}
