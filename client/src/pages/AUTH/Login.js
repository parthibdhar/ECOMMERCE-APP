import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate, useLocation} from "react-router-dom"
import "./../../styles/authStyles.css"
import { useAuth } from "../../context/authContext";
const Login = () => {

  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const location = useLocation()


  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password})
    if (res && res.data.success) {
      toast.success(res.data.msg)
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token
      })
      localStorage.setItem('auth', JSON.stringify(res.data))
      navigate(location.state ||  '/')
      
    }
    else {
      toast.error(res.data.msg)
    }
   } catch (error) {
    console.log(error);
    toast.error("something went wrong");
   }
  };
  return (
    <Layout title={'Login - Ecommece App'}>
       <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
              <div className="mb-3">
              <button type="submit" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </button>
              </div>

          

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login