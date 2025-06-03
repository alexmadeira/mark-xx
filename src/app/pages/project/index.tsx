import { Helmet } from 'react-helmet-async'
import Balancer from 'react-wrap-balancer'

import { Building2, CalendarDays } from 'lucide-react'

export function Project() {
  return (
    <>
      <Helmet title="Project" />
      <div className="fixed top-0 left-0 h-[100vh] max-h-[200vw] min-h-[400px] w-full">
        <div className="bg-web-50 h-full w-full overflow-hidden">
          <img src="/img/temp/projects/chilli-beans.jpg" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="h-[400vh]" />
      <div className="px-x-container absolute top-0 left-0 z-2 w-full pt-[60vh] text-white">
        <div className="flex h-full w-full flex-col gap-[clamp(0.5rem,1vw,2rem)]">
          <h1 className="text-[clamp(2.25rem,7vw,12rem)] leading-[clamp(2.5rem,7vw,8rem)] tracking-normal">
            Chilli Beans
          </h1>
          <p className="flex flex-wrap gap-[clamp(1rem,1.25vw,1.85rem)] px-[clamp(0.375rem,1vw,1.5rem)] text-[clamp(0.8rem,1vw,1.5rem)] leading-[clamp(1.333rem,1vw,1.555rem)]">
            <span className="flex items-center justify-center gap-2">
              <CalendarDays className="w-[clamp(1rem,1.2vw,1.85rem)]" /> 2018
            </span>
            <span className="flex items-center justify-center gap-2">
              <Building2 className="w-[clamp(1rem,1.2vw,1.85rem)]" /> CoreBiz
            </span>
          </p>
        </div>
        <div className="gap mt-[clamp(2.5rem,6vw,12rem)] flex flex-col gap-[clamp(1.5rem,3vw,8rem)] px-[clamp(0.375rem,0.85vw,1.25rem)]">
          <div className="flex flex-col gap-2">
            <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
              Visão Geral do Projeto
            </h2>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                A Mavielo é um ecossistema simples, interativo e inteligente, desenvolvido para profissionais do
                agronegócio, produtores rurais e estudantes. Uma plataforma de networking de excelência, onde você pode
                se conectar, estabelecer novas amizades, manter-se informado e desenvolver oportunidades de negócios.
              </Balancer>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
              O Desafio
            </h2>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                O meu maior desafio foi a falta de conhecimento no agronegócio, um mercado de díficil acesso pela
                cultura dos grandes fazendeiros e pela localização dos pequenos produtores.
              </Balancer>
            </p>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                Além disso, todos os dados disponíveis não refletiam a realidade dos produtores dos quais entrevistamos
                para validação das nossas hispotese, o que tornou ainda mais díficil a concepção de um produto de maior
                impacto.
              </Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
              A Solução
            </h2>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                Pelo projeto ter sido criado por um grande fazendeiro, conseguimos abrir portas significativas em um
                mercado pouco receptivo. Fomos então de porta em porta, de grandes, médios e pequenos produtos, de
                profissonais do agro e estudantes de agronomia, para enfim tanginiblizarmos como conectar todos esses
                stakeholders em um único lugar.
              </Balancer>
            </p>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                Disponível em Android e IOS. Foi utilizado React Native para o desenvolvimento do aplicativo, trazendo
                velocidade no desenvolvimento e custos mais acessíveis para o momento inicial da empresa.
              </Balancer>
            </p>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                O backend conta com uma poderosa arquitetura inspirada no Instagram e Tiktok que mescla micro serviços
                para a Rede Social utilizando Node.js e um monolito escrito em Nest.js.
              </Balancer>
            </p>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                A arquitetura conta com 9 serviços isolados para processamento de conteúdos em imagem, texto e vídeo
                além de uma integração realtime para Chats privados ou em grupo, entregando assim o valor da conexão e
                networking entre os integrantes do ecossistema.
              </Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium">
              Resultados e Impacto{' '}
            </h2>
            <p className="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">
              <Balancer>
                Desde o lançamento em Julho de 2023 até Fevereiro de 2024, a plataforma contava com mais de 5.000
                usuários cobrindo mais de 500.000ha.
              </Balancer>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
