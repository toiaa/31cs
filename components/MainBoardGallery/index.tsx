import useGridNft from '@/hooks/useGridNft'
import GridActions from '../GridActions'
import SquareLoader from '../Loader/SquareLoader'
import GalleryGrid from './GalleryGrid'

function MainBoardGallery() {
  const { isLoading } = useGridNft()
  return (
    <div className='flex flex-col md:flex-col lg:flex-row items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2'>
        {isLoading ? (
          <div className='flex flex-col w-[540px] h-[540px] items-center justify-center'>
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
