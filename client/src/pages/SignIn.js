import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/UserSlice'

const SignIn = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:7000/api/auth/signin", {
            email, password
        }, { withCredentials: true })
        if (!data.message) {
            toast.success(data);
            navigate('/sign-in');
        }

        else if (data.message) {
            dispatch(addUser(data.rest))
            toast.success(data.message);
            navigate('/');
        }
    }
    return (
        <div className='max-w-lg mx-auto'>
            <h1 className='text-center font-semibold text-2xl my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className='border p-3 rounded-lg' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase' type='submit'>Sign In</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Do not have an account?</p>
                <Link to="/sign-up"><span className='text-blue-700'>Sign up</span></Link>
            </div>
        </div>
    )
}

export default SignIn;