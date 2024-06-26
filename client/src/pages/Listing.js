import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getListingInfo();
    }, [])

    const getListingInfo = async () => {
        const { data } = await axios.get(`http://localhost:7000/api/listing/get/${params.id}`, { withCredentials: true });
        setListing(data?.listing)
    }

    const handleRightSwipe = () => {
        { index < listing?.imageUrls.length - 1 ? setIndex(index + 1) : setIndex(0) }
    }

    const handleLeftSwipe = () => {
        { index == 0 ? setIndex(listing?.imageUrls.length - 1) : setIndex(index - 1) }
    }
    return (
        <div className='max-w-[70%] mx-auto'>
            <div className='flex justify-between relative'>
                <button onClick={handleLeftSwipe}>Left Swipe</button>
                <img className='w-[80%] h-96' src={listing?.imageUrls[index]} />
                <button onClick={handleRightSwipe}>Right Swipe</button>
            </div>

            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                <p className='text-2xl font-semibold'>
                    {listing?.name} - ${' '}
                    {listing?.offer
                        ? listing?.discountPrice.toLocaleString('en-US')
                        : listing?.regularPrice.toLocaleString('en-US')}
                    {listing?.type === 'rent' && ' / month'}
                </p>
                <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                    <FaMapMarkerAlt className='text-green-700' />
                    {listing?.address}
                </p>
                <div className='flex gap-4'>
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {listing?.offer && (
                        <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            ${+listing?.regularPrice - +listing?.discountPrice} OFF
                        </p>
                    )}
                </div>
                <p className='text-slate-800'>
                    <span className='font-semibold text-black'>Description - </span>
                    {listing?.description}
                </p>
                <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaBed className='text-lg' />
                        {listing?.bedrooms > 1
                            ? `${listing?.bedrooms} beds `
                            : `${listing?.bedrooms} bed `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaBath className='text-lg' />
                        {listing?.bathrooms > 1
                            ? `${listing?.bathrooms} baths `
                            : `${listing?.bathrooms} bath `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaParking className='text-lg' />
                        {listing?.parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaChair className='text-lg' />
                        {listing?.furnished ? 'Furnished' : 'Unfurnished'}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Listing