import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { server } from '../App'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Header = () => {

    const { isAuthenticated, setisAuthenticated, loading, setloading } = useContext(Context)



    const logoutHandler = async (e) => {
        setloading(true);

        try {
            await axios.get(
                `${server}/users/logout`,
                {
                    withCredentials: true,
                }
            );

            toast.success("Logged out Successfully");
            setisAuthenticated(false);
            setloading(false);

        } catch (error) {
            toast.error("Logged out error");
            setisAuthenticated(true);
            setloading(false);

        }
    };
    return (
        <div className='header'>
            <div>
                <h2>Todo App</h2>
            </div>
            <div>
                <button className='btn'>Home</button>
                {/* <Link to="/home">Home</Link> */}
                <button className='btn'>Profile</button>

                {
                    isAuthenticated ? <button className='btn' onClick={logoutHandler} disabled={loading}>logout</button> : <button className='btn'>login</button>
                }

            </div>

        </div>

    )
}

export default Header