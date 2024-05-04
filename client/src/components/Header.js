import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser } from '../redux/UserSlice'
import axios from 'axios'
import toast from 'react-hot-toast'


const Header = () => {
    const [refresh, setRefresh] = useState(false);
    const currentUser = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(deleteUser(null));
        const { data } = await axios.get("http://localhost:7000/api/auth/logout", {}, { withCredentials: true });
        toast.success(data.message)
        setRefresh(!refresh);
    }
    return (
        <div className='bg-slate-200 shadow-md'>
            <div className='flex justify-between max-w-[70%] mx-auto p-3 items-center'>
                <h1 className='font-bold text-lg'>AR-Estate</h1>
                <form className='flex items-center bg-slate-100 rounded-lg p-2'>
                    <input className='bg-transparent focus:outline-none' type='text' placeholder='Search...' />
                    <FaSearch />
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