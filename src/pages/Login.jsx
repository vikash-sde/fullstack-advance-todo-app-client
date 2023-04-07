import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { server } from '../App';

const Login = () => {
    const { isAuthenticated, setisAuthenticated, loading, setloading } = useContext(Context)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            const { data } = await axios.post(
                `${server}/users/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setisAuthenticated(true);
            setloading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setloading(false);
            setisAuthenticated(false);
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />


    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        disabled={loading}
                        type="submit">
                        Login
                    </button>
                    <h4>Or</h4>
                    <Link to="/register">Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login