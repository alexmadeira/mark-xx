import { Award } from './components/award'

export function Awards() {
  return (
    <div className="w-full">
      <div className="px-x-container mx-auto flex max-w-[2000px] flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
        <h2 className="mx-auto w-full text-center text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          Prêmios/ Reconhecimento
        </h2>
        <ul className="flex flex-col font-light">
          <Award>
            <strong>Best UI Desing:</strong> Prêmio de melhor Interface de Usuário
          </Award>
          <Award>
            <strong>Best UX Desing:</strong> Prêmio de melhor Experiência de Usuário
          </Award>
          <Award>
            <strong>Innovation:</strong> Prêmio de Site Inovador
          </Award>
        </ul>
      </div>
    </div>
  )
}
