import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import ListingCard from '../components/ListingCard'

const Home = () => {

    const searchData = useSelector(store => store?.searchData);
    const [allListing, setAllListing] = useState([])
    const [filteredListing, setFilteredListing] = useState([]);
    useEffect(() => {
        homegetListings();
    }, [])

    const homegetListings = async () => {
        const { data } = await axios.get("http://localhost:7000/api/listing/getAll", { withCredentials: true });
        setAllListing(data);
        setFilteredListing(data);
    }

    useEffect(() => {
        const listingData = filteredListing?.filter((item) => item.name === searchData);
        if (listingData.length !== 0) {
            setFilteredListing(listingData)
        }
        else {
            setFilteredListing(allListing)
        }
    }, [searchData])

    return (
        <div>
            <h1 className='text-center text-3xl font-semibold'>Listings</h1>
            <div className='flex flex-wrap gap-7'>
                {filteredListing?.map((listing) => <ListingCard imageUrl={listing.imageUrls[0]} name={listing.name} description={listing.description} regularPrice={listing.regularPrice} />)}
            </div>
        </div>
    )
}

export default Home