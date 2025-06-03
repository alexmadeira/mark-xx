export function ProjectDetails() {
  return (
    <div className="w-full rounded-lg border border-white p-[clamp(1rem,2vw,2.5rem)]">
      <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-none font-medium">Detalhes do Projeto</h2>
      <div className="mt-[clamp(1rem,1.5vw,2.25rem)] flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)]">
        <div>
          <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Meu Papel</h3>
          <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
            Desenvolvedor Full Stack
          </p>
        </div>
        <div>
          <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Cronograma</h3>
          <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
            2022-2024
          </p>
        </div>
        <div>
          <h3 className="text-[clamp(1.125rem,1.5vw,1.875rem)] leading-none font-normal">Tamanho da Equipe</h3>
          <p className="pl-[clamp(0.25rem,0.75vw,0.5rem)] text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
            3-24
          </p>
        </div>
      </div>
    </div>
  )
}
