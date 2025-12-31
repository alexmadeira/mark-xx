import { ContentPresenter } from './content-presenter'

let presenterContent: ContentPresenter

export function contentPresenter() {
  if (!presenterContent) presenterContent = new ContentPresenter()
  return presenterContent
}
