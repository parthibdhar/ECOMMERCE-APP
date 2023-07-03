import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/authContext'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'


const PrivateRoute = () => {
  const [ok, setOk] = useState(false)
  const[auth, setAuth] = useAuth()

  useEffect(() => {
    const authCheck =  async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user`,)
      res.data.ok ? setOk(true) : setOk(false)
    }
    if (auth && auth.token) authCheck()
  },[auth, auth.token])

  return ok ? <Outlet/> :  <Spinner/>
}

export default PrivateRoute