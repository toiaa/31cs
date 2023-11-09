import useMulticall from '@/hooks/useMulticall'
import SquareLoader from '../Loader/SquareLoader'
import GridActions from '../SingleGrid/GridCards'
import GalleryGrid from './GalleryGrid'

function MainBoardGallery() {
  const { isLoadingGridGallery } = useMulticall()
  return (
    <div className='flex flex-col md:flex-col lg:flex-row gap-2 rounded bg-box p-2 h-full'>
      <div className='card-custom flex flex-col gap-2'>
        {isLoadingGridGallery ? (
          <div className='flex flex-col w-[540px] items-center justify-center h-full'>
            <SquareLoader />
          </div>
        ) : (
          <GalleryGrid />
        )}
      </div>
      <GridActions />
    </div>
  )
}

export default MainBoardGallery
