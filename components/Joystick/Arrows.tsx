import JoystickArrowsIcon from '@/assets/Icons/JoystickArrowsIcon'
import { useStorePointer } from '@/store'
import { DirectionsType } from '@/ts/types'
import React, { useEffect } from 'react'

const Arrows = () => {
  const { pointer } = useStorePointer()
  const SIZE = 10

  const updatePointer = (direction: DirectionsType) => {
    if (pointer === null) {
      useStorePointer.setState({ pointer: { x: 0, y: 0 } })
    } else {
      let newX = pointer.x
      let newY = pointer.y

      if (direction === 'left') {
        newX = (newX - 1 + SIZE) % SIZE
      } else if (direction === 'up') {
        newY = (newY - 1 + SIZE) % SIZE
      } else if (direction === 'down') {
        newY = (newY + 1) % SIZE
      } else if (direction === 'right') {
        newX = (newX + 1) % SIZE
      }
      useStorePointer.setState({ pointer: { x: newX, y: newY } })
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (pointer === null) {
        useStorePointer.setState({ pointer: { x: 0, y: 0 } })
        return
      }

      let newX = pointer.x
      let newY = pointer.y

      switch (event.key) {
        case 'ArrowLeft':
          newX = (newX - 1 + SIZE) % SIZE
          break
        case 'ArrowUp':
          newY = (newY - 1 + SIZE) % SIZE
          break
        case 'ArrowDown':
          newY = (newY + 1) % SIZE
          break
        case 'ArrowRight':
          newX = (newX + 1) % SIZE
          break
        default:
          return
      }

      useStorePointer.setState({ pointer: { x: newX, y: newY } })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [pointer])

  return (
    <section className='flex items-center h-fit pr-0'>
      <button
        className='arrow-horizontal active:translate-x-1 items-center justify-start'
        onClick={() => updatePointer('left')}>
        <JoystickArrowsIcon direction='left' />
      </button>

      <div className='flex flex-col'>
        <button className='arrow-vertical active:translate-y-1 justify-center' onClick={() => updatePointer('up')}>
          <JoystickArrowsIcon direction='up' />
        </button>

        <div className='p-3' />
        <button
          className='arrow-vertical active:-translate-y-1 justify-center items-end'
          onClick={() => updatePointer('down')}>
          <JoystickArrowsIcon direction='down' />
        </button>
      </div>
      <button
        className='arrow-horizontal active:-translate-x-1 items-center justify-end'
        onClick={() => updatePointer('right')}>
        <JoystickArrowsIcon direction='right' />
      </button>
    </section>
  )
}

export default Arrows
