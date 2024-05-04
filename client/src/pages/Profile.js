import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { updatingUser } from '../redux/UserSlice'

const Profile = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const currentUser = useSelector(store => store.user)
    const dispatch = useDispatch();
    const [refresh, setRefesh] = useState(false);

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
    return (
        <div className='max-w-lg mx-auto'>
            <h1 className='text-center font-semibold text-2xl my-7'>Welcome {currentUser.username}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type='text' placeholder='Username' defaultValue={currentUser.username} onChange={(e) => setUsername(e.target.value)} />
                <input className='border p-3 rounded-lg' type='email' placeholder='Email' defaultValue={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                <input className='border p-3 rounded-lg' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase' type='submit'>Update</button>
            </form>
        </div>
    )
}

export default Profile