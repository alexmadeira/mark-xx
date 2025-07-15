import Balancer from 'react-wrap-balancer'

export function Description() {
  return (
    <div className="flex w-full flex-col gap-[clamp(1.5rem,2vw,4rem)] pl-[clamp(0.375rem,0.85vw,1.25rem)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
          Visão Geral do Projeto
        </h2>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            A Mavielo é um ecossistema simples, interativo e inteligente, desenvolvido para profissionais do
            agronegócio, produtores rurais e estudantes. Uma plataforma de networking de excelência, onde você pode se
            conectar, estabelecer novas amizades, manter-se informado e desenvolver oportunidades de negócios.
          </Balancer>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
          O Desafio
        </h2>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            O meu maior desafio foi a falta de conhecimento no agronegócio, um mercado de díficil acesso pela cultura
            dos grandes fazendeiros e pela localização dos pequenos produtores.
          </Balancer>
        </p>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            Além disso, todos os dados disponíveis não refletiam a realidade dos produtores dos quais entrevistamos para
            validação das nossas hispotese, o que tornou ainda mais díficil a concepção de um produto de maior impacto.
          </Balancer>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
          A Solução
        </h2>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            O meu maior desafio foi a falta de conhecimento no agronegócio, um mercado de díficil acesso pela cultura
            dos grandes fazendeiros e pela localização dos pequenos produtores.
          </Balancer>
        </p>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            Além disso, todos os dados disponíveis não refletiam a realidade dos produtores dos quais entrevistamos para
            validação das nossas hispotese, o que tornou ainda mais díficil a concepção de um produto de maior impacto.
          </Balancer>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
          Resultados e Impacto
        </h2>
        <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
          <Balancer>
            Desde o lançamento em Julho de 2023 até Fevereiro de 2024, a plataforma contava com mais de 5.000 usuários
            cobrindo mais de 500.000ha.
          </Balancer>
        </p>
      </div>
    </div>
  )
}
