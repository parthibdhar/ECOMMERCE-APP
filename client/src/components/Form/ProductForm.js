import React from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';

const ProductForm = ({ handleSubmit, product, setProduct, image, setImage }) => {
  // axios intance
  const axiosInstance = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/pdharcloud/image/upload',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

  const handleChange = (e) => {
   console.log("target", e.target.name);
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};



// upload to cloud storage
const uploadImage = async() => {
  console.log("image " , image);

  const formData = new FormData();
  formData.append("file", image);
  console.log("formdata_file:  " , formData);
  formData.append("upload_preset", "Ecommerce-app-2023");
  console.log("formdata_upload-preset:  " , formData);
  

  await axiosInstance.post('', formData).
  then(r => console.log(r.data)).
  catch(err => console.error(err))
}
console.log("after change: ", product);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            placeholder="provide products image"
            name='photo'
            onChange={(e) => {
              setImage(e.target.files[0])
              
            }}
          />
          <button onClick={uploadImage}> dao</button>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new productr Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter the description of product"
            name='description'
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter product price"
            name='price'
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="available quantity"
            name='quantity'
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Shipping details"
            name='shipping'
            onChange={handleChange}
          />
          <input type="submit" className=" m-3 btn btn-primary" value="submit" />
        </div>
      </form>
    </>
  );
};

export default ProductForm;
