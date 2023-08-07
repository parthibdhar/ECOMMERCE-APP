import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import ProductForm from "../../components/Form/ProductForm";
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate()
  const port = process.env.REACT_APP_API
  const { Option } = Select
  const [categories, setCategories] = useState([]);
  
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: 0,
    quantity: 0,
    shipping: false,
  })
  const [image, setImage] = useState([])
  const [base64Image, setBase64Image] = useState("")


  //Handle Form for create Products
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      console.log("hello> " , product, category);
      const { data } = await axios.post(
        `${port}/api/v1/products/create-product`,
        {...product,
          category,
          price: parseInt(product.price),
          quantity: parseInt(product.quantity), 
        },
              );
      alert("hi")
      if (data?.success) {
        toast.success(`${data.product.name} created successfully}`);
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

 

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
            <div className="m-1 mb-3 " style={{ cursor: 'pointer' }}>
              <Select bordered={true}
                placeholder=" select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                style={{ cursor: 'pointer' }} >
                {categories?.map(c => (
                  <Option key={c._id} value={c.name}>{c.name}</Option>
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
                base64Image={base64Image}
                setBase64Image={setBase64Image}

              />
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CreateProduct;


// images post axios
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const formData = new FormData();
//   console.log("pele? ", image);
//     setProduct(prev => ({ ...prev, image: formData }))
//     console.log("formData", formData);
//     const { data } = await axios.post(
//       `${port}/api/v1/products/create-product`,
//       {
//         ...product,
//         category,
//         price: parseInt(product.price),
//         quantity: parseInt(product.quantity),
        
//       },
//             );
//     alert("hi")
//     if (data?.success) {
//       toast.success(`${data.product.name} created successfully}`);
//       getAllProducts();
//     } else {
//       toast.error(data.msg);
//     }
//     alert("hi")
//     console.log(data);
//     if (data?.success) {
//       toast.success(`${data.product.name} created successfully}`);
//       getAllProducts();
//     } else {
//       toast.error(data.msg);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("something went wrong in input form");
//   }
// };
