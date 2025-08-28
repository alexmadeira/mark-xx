import type { TContentPreseterTemplates } from '@/services/preseter/content'

export const projectTemplates = {
  heading_2: `
    <h2 class="mt-[clamp(0.5rem,1.5vw,2rem)] text-[clamp(1.25rem,1.85vw,3.25rem)] leading-[calc(1.75/1.25),2vw,2.25)] font-medium first:mt-0">{{text}}</h2>
  `.trim(),
  paragraph: `
    <p class="text-[clamp(0.875rem,1vw,1.5rem)] leading-[calc(1.25/0.875),2vw,calc(2/1.5)] font-light">{{text}}</p>
  `.trim(),
} satisfies TContentPreseterTemplates
