import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import ProductForm from "../../components/Form/ProductForm";
import {Select} from 'antd';

const CreateProduct = () => {
  const port = process.env.REACT_APP_API 
  const {Option} = Select
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState({
    photo: '',
    name: '',
    description: '',
    price: '',
    quantity: 0,
    shipping: false,
  })
   const [image, setImage] = useState("")
  

  
  //Handle Form for create categories
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("dhuksi suna");
      const { data } = await axios.post(
        `${port}/api/v1/products/create-product`,
        { ...product, category, quantity: parseInt(product.quantity)}
      );
      if (data?.success) {
        toast.success(`${data.product.name} created successfully}`);
        getAllProducts();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };
 
   //get all Products
   const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/products/get-products`
      );
      console.log(data);

      if (data.success) setAllProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/category/getAll-Categories`
      );
      console.log(data);

      if (data?.success) setCategories(data?.allCategories);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title=" Dashboard - Create Product Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>create products</h1>
            <div className="m-1 " style={{cursor: 'pointer'}}>
              <Select bordered={true}
               placeholder = " select a category" 
               size="large" 
               showSearch 
               className="form-select mb-3"
               onChange={(value) => setCategory(value)}
               style={{cursor: 'pointer'}} >
                {categories?.map(c =>(
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
               </Select>
            </div>
            <div className="p-3 w-50">
              <ProductForm
                handleSubmit={handleSubmit}
                product={product}
                setProduct={setProduct}
                image={image}
                setImage={setImage}
              />
              </div>
            </div>
          </div>
        </div>
      
    </Layout>
  );
};

export default CreateProduct;
