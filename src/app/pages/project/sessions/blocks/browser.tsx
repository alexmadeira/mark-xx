const browserPreviewIds = ['browser-preview-1', 'browser-preview-2', 'browser-preview-3', 'browser-preview-4']

export function Browser() {
  return (
    <div className="md:px-x-container flex w-full flex-col flex-wrap items-start justify-start gap-[clamp(1rem,2vw,3rem)] px-8 py-[clamp(2rem,3vw,5rem)] md:flex-row">
      {browserPreviewIds.map((id) => (
        <div key={id} className="3xl:min-w-75 flex flex-1 md:min-w-75 lg:min-w-100 xl:min-w-100 2xl:min-w-150">
          <img alt="" className="w-full" data-src="/img/temp/browser/chrome.png" />
        </div>
      ))}
    </div>
  )
}
