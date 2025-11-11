import { useLocation } from 'react-router-dom'

export function Full() {
  const { pathname } = useLocation()

  return (
    <div className="md:px-x-container flex w-full items-start justify-start px-8 py-[clamp(2rem,3vw,5rem)]">
      <div className="h-full w-full overflow-clip">
        <img alt="" className="w-full" data-src={`https://picsum.photos/3000/2000?${pathname}`} />
      </div>
    </div>
  )
}
// {/*"https://res.cloudinary.com/dgoi1pk8i/image/upload/v1761936650/samples/shoe.jpg"*/}
