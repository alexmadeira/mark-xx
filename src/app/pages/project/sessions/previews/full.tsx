export function Full() {
  return (
    <div className="md:px-x-container flex w-full items-start justify-start px-8 py-[clamp(2rem,3vw,5rem)]">
      <div className="h-full w-full overflow-clip">
        <img
          className="w-full"
          src={`https://fastly.picsum.photos/id/756/3000/1500.jpg?hmac=oR7PEfp08xQltnCgoEqkPHI5wCqqcQ8jXFJAuDvpkT4`}
        />
      </div>
    </div>
  )
}
