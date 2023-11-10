import { useStoreSelectedTiles } from '@/store'
import { Tile } from '@/ts/types'

const useControls = ({ nftId }: { nftId: string }) => {
  const { selectedTiles } = useStoreSelectedTiles()

  const isSelected = ({ x, y }: Tile): boolean => {
    return selectedTiles.some((tile) => tile.x === x && tile.y === y)
  }

  const handleSaveSelection = ({ x, y }: Tile) => {
    if (isSelected({ x, y })) {
      const updatedTiles = selectedTiles.filter((tile) => !(tile.x === x && tile.y === y))
      useStoreSelectedTiles.setState({
        selectedTiles: updatedTiles,
        nftId: nftId,
      })
    } else {
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTiles, { x, y }], nftId: nftId })
    }
  }

  return { selectedTiles, isSelected, handleSaveSelection }
}

export default useControls
