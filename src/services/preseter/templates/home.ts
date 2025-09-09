import type { TContentPreseterTemplates } from '@/services/preseter/content'

export const homeTemplates = {
  paragraph: `
  <p class="text-[clamp(0.875rem,2vw,2.25rem)] leading-[clamp(1.25rem,2vw,2.5rem)] font-light">{{text}}</p>
  `.trim(),
} satisfies TContentPreseterTemplates
