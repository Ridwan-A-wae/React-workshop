import React from 'react'
import LikePoke from './LikePoke'

function FavPoke({fav}) {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {fav?.map((data,idx) => (
          <div key={idx}>
            <img src={data?.sprites?.other?.home?.front_default} alt={data?.species.name} />
            <LikePoke/>
          </div>
        ))}
    </div>
    
  )
}

export default FavPoke