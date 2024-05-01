import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Header = () => {
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
                    <Link to="/sign-in"><li>Sign-in</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Header