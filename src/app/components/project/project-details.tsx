import { TProjectDetailsProps, ZProjectDetailsProps } from '@/props/pages/projects/project-details'

import { useEffect, useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { overlapController } from '_SRV/controller'

export function ProjectDetails(data: Partial<TProjectDetailsProps>) {
  const detailRef = useRef<HTMLDivElement>(null)
  const overlapLogo = overlapController('logo')

  const { image, color, ...props } = ZProjectDetailsProps.parse(data)

  useEffect(() => {
    overlapLogo.addElement(detailRef.current, color)
  }, [detailRef.current])

  return (
    <div
      ref={detailRef}
      className={twMerge(
        'relative flex h-full w-full flex-1 items-center justify-center overflow-hidden p-3',
        props.className,
      )}
    >
      <div className="h-full w-full overflow-clip">
        <img
          {...image}
          className={twMerge(
            'h-full w-full object-contain transition-all duration-[2s] group-hover/masonry-item:scale-120 group-hover/masonry-item:blur-[0.5rem] group-hover/masonry-item:duration-[8s]',
            image.className,
          )}
        />
      </div>
      <div className="absolute bottom-0 left-0 z-1 flex flex-col gap-[clamp(0.5rem,0.75vw,1.25rem)] px-[clamp(1rem,1.5vw,2.5rem)] pb-[clamp(0.7rem,1.5vw,2.5rem)]">
        <h2 className="group-data-[size='2x2']/masonry-item:4xl:block group-data-[size='2x4']/masonry-item:3xl:block 5xl:text-5xl translate-y-5 text-2xl font-semibold text-zinc-300 opacity-0 transition-all delay-75 duration-300 group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 sm:text-3xl group-data-[size='2x2']/masonry-item:sm:hidden group-data-[size='2x4']/masonry-item:sm:hidden md:text-4xl">
          Chilli Beans
        </h2>
        <p className="group-data-[size='2x2']/masonry-item:4xl:flex group-data-[size='2x4']/masonry-item:3xl:flex flex translate-y-5 flex-wrap gap-[clamp(0.5rem,0.5vw,1rem)] pb-1 text-[clamp(0.75rem,0.8vw,1.25rem)] leading-[clamp(1.333rem,1vw,1.555rem)] text-zinc-300 opacity-0 delay-100 duration-300 group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 group-data-[size='2x2']/masonry-item:sm:hidden group-data-[size='2x4']/masonry-item:sm:hidden">
          <span className="rounded-full bg-zinc-700/40 px-4 py-0.5 backdrop-blur-sm">E-commerce</span>
          <span className="rounded-full bg-zinc-700/40 px-4 py-0.5 backdrop-blur-sm">UX/UI</span>
          <span className="rounded-full bg-zinc-700/40 px-4 py-0.5 backdrop-blur-sm">front-end</span>
        </p>
        <p className="group-data-[size='2x4']/masonry-item:5xl:block group-data-[size='2x2']/masonry-item:5xl:block group-data-[size='4x2']/masonry-item:4xl:block hidden w-full translate-y-5 text-[clamp(0.85rem,1.5vw,1rem)] leading-[clamp(1.45rem,1.5vw,1.5rem)] text-zinc-300 opacity-0 delay-150 duration-300 group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 group-data-[size='2x4']/masonry-item:hidden group-data-[size='4x2']/masonry-item:hidden group-data-[size='8x8']/masonry-item:block group-data-[size='4x4']/masonry-item:2xl:block">
          Mais que uma marca de óculos e acessórios a
          <strong className="px-1 font-semibold underline">Chilli Beans</strong>é uma atitude. Com um estilo ousado,
          provocativo e sempre à frente do seu tempo, o e-commerce foi feito para quem vive intensamente, desafia o
          óbvio e transforma cada escolha em uma declaração de personalidade.
        </p>
      </div>
    </div>
  )
}
