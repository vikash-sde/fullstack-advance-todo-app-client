import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { server } from '../App'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Header = () => {

    const { isAuthenticated, setisAuthenticated, loading, setloading } = useContext(Context)
    const navigate = useNavigate()

    const logoutHandler = async (e) => {
        setloading(true);
        try {
            await axios.get(
                `${server}/users/logout`,
                {
                    withCredentials: true,
                }
            );
            navigate("/login")
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
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {isAuthenticated ? (
                    <button disabled={loading} onClick={logoutHandler} className="btn">
                        Logout
                    </button>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
            </article>

        </div>

    )
}

export default Header