import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Context } from './main';

export const server = "https://advance-todoapp.onrender.com/api/v1"

function App() {
  const { user, setuser, setisAuthenticated, setloading } = useContext(Context)


  useEffect(() => {
    setloading(true)
    try {
      axios.get(`${server}/users/me`, { withCredentials: true }).then((res) => {
        setuser(res.data.user)
        setisAuthenticated(true)
        setloading(false)

      })
    } catch (error) {
      setuser({})
      setisAuthenticated(false)

    }


  }, [])


  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  )
}

export default App
