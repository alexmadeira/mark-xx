import { ContentPreseter } from './content-preseter'

let preseterContent: ContentPreseter

export function contentPreseter() {
  if (!preseterContent) preseterContent = new ContentPreseter()
  return preseterContent
}
