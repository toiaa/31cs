import React from 'react'
import ClaimBox from './ClaimBox'
import Header from './Header'
import ListCriteria from './ListCriteria'

const ClaimSection = () => {
  return (
    <section className='card-custom flex flex-col items-center gap-5'>
      <Header />
      <ClaimBox />
      <ListCriteria />
    </section>
  )
}

export default ClaimSection
