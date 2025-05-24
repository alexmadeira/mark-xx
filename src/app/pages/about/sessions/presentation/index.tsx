export function Presentation() {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full grid-cols-1 flex-col gap-5 px-[clamp(1.25rem,5vw,5rem)] md:gap-10 lg:grid-cols-12">
        <h2 className="text-black-900 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal lg:col-span-12 xl:col-span-3 2xl:col-span-3">
          Transformando ideias em códigos, e códigos em produtos digitais.
        </h2>

        <div className="flex flex-col gap-20 lg:col-span-12 xl:col-span-9 2xl:col-span-9">
          <div className="flex flex-col gap-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,2vw,1.5rem)] leading-[clamp(1.5rem,3vw,2rem)] font-light">
            <p>
              Ingressei na área de programação em 2009, após realizar trabalhos como freelancer. No início da carreira,
              atuei como Desenvolvedor Web em uma época em que os termos front-end e back-end ainda não eram comuns.
            </p>
            <p>
              Minhas habilidades iniciais envolviam PHP, HTML, CSS e JavaScript. Ao longo do tempo, concentrei meus
              esforços no aprimoramento do front-end, utilizando JavaScript, especialmente o JQuery naquela época. Essa
              combinação possibilitava tornar páginas estáticas mais interativas e frequentemente mais amigáveis.
            </p>
            <p>
              Com a evolução tecnológica, direcionei meus estudos para o JavaScript, posteriormente adotando o ReactJs e
              todo o seu ecossistema como minha Stack principal. Contribuí em projetos de renome, colaborando com marcas
              como Boticário, Mizuno, Droga Raia, Jeep, Carrefour e Chilli Beans.
            </p>
            <p>
              Em meu tempo livre, pratico esportes com meus “lobos“ Chrono e Misty, assisto a filmes e jogo games retrô.
            </p>
          </div>
          <div className="hidden flex-col gap-8 sm:flex">
            <a href="#" className="text-[clamp(1.75rem,2vw,1.875rem)] leading-[clamp(1.875rem,2vw,2.25rem)] underline">
              alex.c.madeira@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
