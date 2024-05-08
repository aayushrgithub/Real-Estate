import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser } from '../redux/UserSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { addData } from '../redux/SearchSlice'


const Header = () => {
    const [refresh, setRefresh] = useState(false);
    const currentUser = useSelector(store => store.user);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async () => {
        dispatch(deleteUser(null));
        const { data } = await axios.get("http://localhost:7000/api/auth/logout", {}, { withCredentials: true });
        toast.success(data.message)
        setRefresh(!refresh);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addData(searchTerm));
    }

    return (
        <div className='bg-slate-200 shadow-md'>
            <div className='flex justify-between max-w-[70%] mx-auto p-3 items-center'>
                <h1 className='font-bold text-lg'>AR-Estate</h1>
                <form onSubmit={handleSubmit} className='flex items-center bg-slate-100 rounded-lg p-2'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='bg-transparent focus:outline-none' type='text' placeholder='Search...' />
                    <button><FaSearch /></button>

                </form>
                <ul className='flex gap-7'>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    {currentUser ? <Link to="/profile"><li>{currentUser.username}</li></Link> : <Link to="/sign-in"><li>Sign-in</li></Link>}
                    {currentUser ? <Link to="/sign-in"><li onClick={handleLogout}>Logout</li></Link> : null}
                </ul>
            </div>
        </div>
    )
}

export default Header