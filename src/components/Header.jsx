import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <div>
                <h2>Todo App</h2>
            </div>
            <div>
                <button className='btn'>Home</button>
                {/* <Link to="/home">Home</Link> */}
                <button className='btn'>Profile</button>
                <button className='btn'>login</button>
            </div>

        </div>

    )
}

export default Header