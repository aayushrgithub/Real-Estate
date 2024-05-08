import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatingUser } from '../redux/UserSlice'

const Profile = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const currentUser = useSelector(store => store.user)
    const dispatch = useDispatch();
    const [refresh, setRefesh] = useState(false);
    const [showListing, setShowListing] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`http://localhost:7000/api/user/update/${currentUser._id}`, {
            username, email, password
        }, {
            withCredentials: true,
        })
        if (!data.message) {
            toast.success(data);
        }
        else {
            toast.success(data.message);
            dispatch(updatingUser(data.rest));
            setRefesh(!refresh);
        }
    }


    const handleListings = async () => {
        const { data } = await axios.get(`http://localhost:7000/api/user/listings/${currentUser._id}`, {
            withCredentials: true,
        })
        setShowListing(data);
    }

    const handleDelete = async (id) => {
        const { data } = await axios.delete(`http://localhost:7000/api/listing/deleteListing/${id}`, {
            withCredentials: true,
        })
        setShowListing((prev) => prev.filter((listing) => listing._id !== id))
    }
    return (
        <div className='max-w-lg mx-auto'>
            <h1 className='text-center font-semibold text-2xl my-7'>Welcome {currentUser.username}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type='text' placeholder='Username' defaultValue={currentUser.username} onChange={(e) => setUsername(e.target.value)} />
                <input className='border p-3 rounded-lg' type='email' placeholder='Email' defaultValue={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                <input className='border p-3 rounded-lg' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase' type='submit'>Update</button>
                <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create Listing</Link>
            </form>
            <button onClick={handleListings} className='text-green-700 w-full mt-4'>Show listings</button>
            {showListing && showListing?.length > 0 &&
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center text-2xl uppercase mt-4'>Your Listings</h1>
                    {showListing?.map((listing) => (

                        <div className='flex border-2 border-gray-700 p-2 justify-between items-center'>
                            <Link to={`/listing/${listing?._id}`}><img className='h-16 w-16 object-contain' src={listing?.imageUrls[0]} /></Link>
                            <Link to={`/listing/${listing?._id}`}> <h1>{listing?.description}</h1></Link>
                            <div className='flex flex-col gap-2'>
                                <button onClick={() => handleDelete(listing?._id)} className='text-red-600 uppercase font-semibold'>Delete</button>
                                <button className='text-green-600 uppercase font-semibold'>Edit</button>
                            </div>
                        </div>

                    ))}

                </div>}

        </div>
    )
}

export default Profile