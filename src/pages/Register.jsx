import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../App';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Context } from '../main';

const Register = () => {
    const { isAuthenticated, setisAuthenticated } = useContext(Context)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        // setLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${server}/users/register`,
                {
                    name,
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
            // setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setisAuthenticated(false);
            // setLoading(false);
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        required
                    />
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
                    <button type="submit">Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Log In</Link>
                </form>
            </section>
        </div>
    )
}

export default Register