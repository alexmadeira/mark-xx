import type { TContentPreseterTemplates } from '@/services/preseter/content'

export const aboutTemplates = {
  paragraph: `
  <p>{{text}}</p>
  `.trim(),
  image: `
    <img src="{{{src}}}" alt="{{caption.text}}" className="h-full w-full rounded-md object-contain" />
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
