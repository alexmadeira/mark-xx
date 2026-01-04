export function Browser() {
  return (
    <div className="md:px-x-container flex w-full flex-col flex-wrap items-start justify-start gap-[clamp(1rem,2vw,3rem)] px-8 py-[clamp(2rem,3vw,5rem)] md:flex-row">
      {Array(4)
        .fill('')
        .map((_item) => (
          <div className="3xl:min-w-75 flex flex-1 md:min-w-75 lg:min-w-100 xl:min-w-100 2xl:min-w-150">
            <img className="w-full" data-src="/img/temp/browser/chrome.png" alt="" />
          </div>
        ))}
    </div>
  )
}
