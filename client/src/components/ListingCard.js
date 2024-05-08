import React from 'react'

const ListingCard = ({ imageUrl, name, description, regularPrice }) => {
    return (
        <div className='border-2 border-slate-300 p-2 max-w-[30%]'>
            <img className=' h-52 w-full' src={imageUrl} />
            <h1 className='text-center font-bold'>{name}</h1>
            <p className='w-full'>{description}</p>
            <h1 className='font-bold text-center'>Regular Price (Rs):{regularPrice}</h1>
        </div>
    )
}

export default ListingCard