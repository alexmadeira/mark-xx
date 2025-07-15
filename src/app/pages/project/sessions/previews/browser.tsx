export function Browser() {
  return (
    <div className="px-x-container flex w-full flex-col flex-wrap items-start justify-start gap-[clamp(1rem,2vw,3rem)] py-[clamp(2rem,3vw,5rem)] md:flex-row">
      {Array(4)
        .fill('')
        .map((_item) => (
          <div className="3xl:min-w-[300px] flex flex-1 md:min-w-[300px] lg:min-w-[400px] xl:min-w-[400px] 2xl:min-w-[600px]">
            <img className="w-full" src="/img/temp/browser/chrome.png" />
          </div>
        ))}
    </div>
  )
}
