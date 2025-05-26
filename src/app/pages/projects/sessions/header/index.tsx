import { useEffect, useRef } from 'react'

import { overlapController, scrollingController } from '_SRV/controller'

export function Header() {
  const ScrollController = scrollingController()
  ScrollController.scrollTo(0, { immediate: true })

  const overlapLogo = overlapController('logo')

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    overlapLogo.addElement(titleRef.current, '#000000')
    overlapLogo.addElement(subTitleRef.current, '#000000')
  }, [subTitleRef.current])

  return (
    <div className="w-full pt-[100px]">
      <div className="my-[clamp(1rem,4vw,5rem)] w-full">
        <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
          <h1
            ref={titleRef}
            className="text-black-900 w-full text-[clamp(3rem,12vw,8rem)] leading-none tracking-widest"
          >
            Projetos
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
        <div className="w-full">
          <div className="px-x-container mx-auto grid w-full grid-cols-1 flex-col gap-5 md:gap-10 lg:grid-cols-12">
            <h2
              ref={subTitleRef}
              className="text-black-900 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal lg:col-span-12 xl:col-span-3 2xl:col-span-3"
            >
              Transformando ideias em códigos
            </h2>

            <div className="flex flex-col gap-20 lg:col-span-12 xl:col-span-9 2xl:col-span-9">
              <div className="flex flex-col gap-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,2vw,1.5rem)] leading-[clamp(1.5rem,3vw,2rem)] font-light">
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
