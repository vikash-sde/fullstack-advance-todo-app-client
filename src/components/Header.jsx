import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'

const Header = () => {

    const { isAuthenticated, setisAuthenticated } = useContext(Context)

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
                    isAuthenticated ? <button className='btn'>logout</button> : <button className='btn'>login</button>
                }

            </div>

        </div>

    )
}

export default Header