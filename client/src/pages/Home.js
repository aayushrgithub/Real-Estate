import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector(store => store.user)
    console.log(user)
    return (
        <div>{user?.username}</div>
    )
}

export default Home