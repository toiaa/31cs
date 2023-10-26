import usePixelGrid from '@/hooks/usePixelGrid'
import { useStoreSelectedTiles } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { SingleGridInterface } from '@/ts/interfaces'
import GridActions from '../GridActions'
import SquareLoader from '../Loader/SquareLoader'
import PixelGrid from './PixelGrid'
const SingleGrid = ({ nftId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(nftId)
  const { selectedTiles: selectedTilesStore } = useStoreSelectedTiles()
  const handleSaveSelection = (x: number, y: number) => {
    const isTileSelected = selectedTilesStore.some((tile) => tile.x === x && tile.y === y)
    if (isTileSelected) {
      const updatedTiles = selectedTilesStore.filter((tile) => !(tile.x === x && tile.y === y))
      useStoreSelectedTiles.setState({ selectedTiles: updatedTiles, nftId: nftId })
    } else {
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTilesStore, { x, y }], nftId: nftId })
    }
  }

  return (
    <div className='flex flex-col md:flex-col lg:flex-row gap-2 rounded bg-box p-2 h-full'>
      <div className='card-custom flex flex-col gap-5'>
        {isLoading ? (
          <div className='flex flex-col w-[540px] items-center justify-center h-full'>
            <SquareLoader />
          </div>
        ) : (
          <PixelGrid
            nftId={nftId}
            handleSaveSelection={handleSaveSelection}
            selectedTiles={selectedTilesStore}
            clearPixelSelect={clearPixelSelect}
          />
        )}
      </div>
      <GridActions clearPixelSelect={clearPixelSelect} />
    </div>
  )
}
export default SingleGrid
