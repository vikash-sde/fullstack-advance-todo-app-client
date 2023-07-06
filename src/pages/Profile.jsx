import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';

const Profile = () => {

    const { isAuthenticated, user, loading } = useContext(Context)

    if (!isAuthenticated) return <Navigate to={"/login"} />;
    return (
        <div>

            {
                loading ? <Loader /> : (
                    <>
                        <h1>{user?.name}</h1>
                        <p>{user?.name}</p>
                    </>
                )
            }

        </div>
    )
}

export default Profile