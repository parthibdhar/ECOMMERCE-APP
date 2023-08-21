import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const port = process.env.REACT_APP_API
  //context
  const [auth, setAuth] = useAuth()

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  //get user data
useEffect(() =>{
  const {email, name, phone, address} = auth?.user
  setName(name);
  setEmail(email);
  setPhone(phone);
  setAddress(address);

},[auth?.user])


  // form handleing
  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const {data} = await axios.put(`${port}/api/v1/auth/profile`, {name, email, password, phone, address})

    if(data?.error) toast.error(data.error)
    else if(data?.success) {
  setAuth({...auth, user: data?.updatedUser})
  let ls = localStorage.getItem('auth')
  ls = JSON.parse(ls)
  ls.user = data?.updatedUser
  localStorage.setItem('auth', JSON.stringify(ls))
  setPassword("")
  toast.success(data.msg)
  }
   
    }
   
    catch (error) {
    console.log(error);
    toast.error("something went wrong");
   }
  };
  return (
    <Layout title="Dashboard - Your Orders Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div className="form-container">
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            
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
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your phione number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your address"

              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile