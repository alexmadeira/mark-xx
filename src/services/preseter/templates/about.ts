import type { TContentPreseterTemplates } from '@/services/preseter/content'

export const aboutTemplates = {
  heading_2: `
  <h2 class="text-black-900 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal">{{text}}</h2>
  `.trim(),
  paragraph: `
  <p>{{text}}</p>
  `.trim(),
  video: `
    <video
      loop
      muted
      autoPlay
      playsInline
      src={{src}}
      class="h-full w-full object-cover object-center"
    />
  `.trim(),
} satisfies TContentPreseterTemplates
