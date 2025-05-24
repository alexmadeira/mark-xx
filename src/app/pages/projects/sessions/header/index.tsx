import { scrollController } from '_SRV/controller'

export function Header() {
  const ScrollController = scrollController()
  ScrollController.scrollTo(0, { immediate: true })

  return (
    <div className="w-full pt-[100px]">
      <div className="my-[clamp(1rem,_4vw,_5rem)] w-full">
        <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
          <h1 className="text-black-900 w-full text-[clamp(3rem,_12vw,_8rem)] leading-none tracking-widest">
            Projetos
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
        <div className="w-full">
          <div className="mx-auto grid w-full grid-cols-1 flex-col gap-5 px-[clamp(1.25rem,5vw,5rem)] md:gap-10 lg:grid-cols-12">
            <h2 className="text-black-900 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal lg:col-span-12 xl:col-span-3 2xl:col-span-3">
              Transformando ideias em códigos
            </h2>

            <div className="flex flex-col gap-20 lg:col-span-12 xl:col-span-9 2xl:col-span-9">
              <div className="flex flex-col gap-[clamp(1rem,_2vw,_2rem)] text-[clamp(1rem,_2vw,_1.5rem)] leading-[clamp(1.5rem,_3vw,_2rem)] font-light">
                <p>
                  Ingressei na área de programação em 2009, após realizar trabalhos como freelancer. No início da
                  carreira, atuei como Desenvolvedor Web em uma época em que os termos front-end e back-end ainda não
                  eram comuns.
                </p>
                <p>
                  Minhas habilidades iniciais envolviam PHP, HTML, CSS e JavaScript. Ao longo do tempo, concentrei meus
                  esforços no aprimoramento do front-end, utilizando JavaScript, especialmente o JQuery naquela época.
                  Essa combinação possibilitava tornar páginas estáticas mais interativas e frequentemente mais
                  amigáveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
