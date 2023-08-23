/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
// import {toast} from "react-toastify"
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./../../styles/authStyles.css"


const ForgotPassword = () => {
    
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate()
 
  
  
    //form function
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {email, newPassword, question})
      if (res && res.data.success) {
        toast.success(res.data.msg)
        
        navigate('/login')
        
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
    <Layout title={'Forgot - Password - -Ecommerce App'}>
      <div className="form-container">
        <h1>Reset Password</h1>
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
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your Favourite sports"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
         
             
          

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword