import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate()

  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address})
    if (res.data.success) {
      toast.success(res.data.msg)
    }
    else {
      toast.error(res.data.msg)
      navigate('/login')
    }
   } catch (error) {
    console.log(error);
    toast.error("something went wrong");
   }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="register">
        <h1>Register</h1>
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
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
