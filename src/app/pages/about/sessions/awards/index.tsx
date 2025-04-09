import { Award } from './components/award'
import { Title } from './components/title'

export function Awards() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto flex max-w-[2000px] flex-col gap-[clamp(0.5rem,_2vw,_2.5rem)] px-5">
        <Title>Prêmios/ Reconhecimento</Title>
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
