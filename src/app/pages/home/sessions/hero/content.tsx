export function Content() {
  return (
    <div className="relative z-1 mt-auto">
      <div className="flex h-full w-full flex-1 flex-col items-start justify-between gap-4 px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(1.25rem,3vw,2.5rem)] md:flex-row md:items-center">
        <div className="flex flex-1">
          <p className="text-[clamp(0.875rem,2vw,2.25rem)] leading-[clamp(1.25rem,2vw,2.5rem)] font-light">
            Projetos de 2010 a 2023. Explore meu portfólio, conheça mais sobre meu perfil ou envie um e-mail.
          </p>
        </div>
        <div className="relative z-1 flex flex-1 flex-col items-start gap-1 md:items-end">
          <a href="#" className="text-[clamp(1rem,1.5vw,1.875rem)] leading-[clamp(1.5rem,1.5vw,2.5rem)] underline">
            alex.c.madeira@gmail.com
          </a>
          <ul className="flex w-full items-center justify-center gap-5 text-[clamp(0.875rem,1.5vw,1.5rem)] leading-[clamp(1.25rem,1.5vw,2rem)] md:justify-end">
            <li>
              <a href="#" className="underline">
                Linkedin
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Github
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
