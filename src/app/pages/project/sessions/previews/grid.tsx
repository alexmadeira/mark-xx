export function Grid() {
  return (
    <div className="md:px-x-container 3xl:grid-cols-8 grid h-full w-full flex-1 grid-flow-row-dense gap-4 p-4 px-8 py-[clamp(2rem,3vw,5rem)] sm:grid-cols-2 md:grid-cols-4">
      {Array(16)
        .fill('')
        .map((_item, i) => (
          <div className="h-full w-full overflow-clip">
            <img className="w-full" src={`https://picsum.photos/300/200?${i}`} />
          </div>
        ))}
    </div>
  )
}
