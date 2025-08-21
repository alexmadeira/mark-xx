import type { TContentPreseterTemplates } from '@/services/preseter/content'

export const projectsTemplates = {
  paragraph: `
  <p>{{text}}</p>
  `.trim(),
} satisfies TContentPreseterTemplates
