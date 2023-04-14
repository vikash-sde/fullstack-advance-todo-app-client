import React, { useEffect } from 'react'
import { useState } from 'react'
import { server } from '../App'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Home = () => {

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [loading, setloading] = useState(false)
    const [tasks, settasks] = useState([])



    const submitHandler = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const { data } = await axios.post(`${server}/task/new`, { title, description }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            setdescription("")
            settitle("")
            toast.success(data.message)
            setloading(false)
        }
        catch (error) {
            toast.error(error.response.data.message)
            setloading(false)
        }
    }

    useEffect(() => {
        axios.get(`${server}/task/all`, {
            withCredentials: true,
        }).then((res) => {
            settasks(res.data.tasks)
        }).catch(err => {
            toast.error(err.response.data.message)
        })


    }, [])
    return (
        <div className='container'>
            <div className="login">
                <section>
                    <form onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            Add Task
                        </button>

                    </form>
                </section>
            </div>

            <section className='todosContainer'>
                {
                    tasks.map(ele => (
                        <div key={ele._id}>{ele.title}</div>
                    ))
                }
            </section>
        </div>
    )
}

export default Home