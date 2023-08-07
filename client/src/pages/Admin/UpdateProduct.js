import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const port = process.env.REACT_APP_API
    const { Option } = Select
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState({
      name: '',
      image: '',
      description: '',
      price: 0,
      quantity: 0,
      shipping: false,
    })

    // form details onchage
const handleChange = (e) => {
      console.log("target", e.target.name);
      setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(product);
}; 

//get single products
const getSingleProduct = async() =>{
    try {
        const {data} = await axios.get(`${port}/api/v1/products/get-products/${params.slug}`)
        setProduct(data.product)
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getSingleProduct()  
   //eslint-disable-next-line
}, []);


     //Handle Form for Update Products
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {  
      console.log("hello> " , product, category);
      const { data } = await axios.put(
        `${port}/api/v1/products/update-product/${product._id}`,
        {...product,
          price: parseInt(product.price),
          quantity: parseInt(product.quantity), 
        },
              );
      if (data?.success) {
        toast.success(`${data.product.name} Updated successfully`);
        console.log(data.product);
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

    // Handle Form for Delete Products
const handleDeleteProduct = async () => {
  try {
    let answer = window.prompt('Are you sure you want to delete? write yes');
    if(!answer) return ;
    const {data} = await axios.delete(`${port}/api/v1/products/delete-product/${product._id}`)
    if (data.success) {
      toast.success(`${product.name} deleted successfully`)
      navigate('/dashboard/admin/products')
    } else{
      toast.error(data.error)
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}
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

  // photo submut
  const handlePhotoSubmut = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile); // Use 'image' as the key to match the backend's upload.single('image') middleware

      const {data} = await axios.put(`${port}/api/v1/products/create-product-image/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data?.success) {
        toast.success(`${data.product.name} got the new product image`);
        console.log(data.image);
        getSingleProduct()
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
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
          <h1>Update products</h1>
          <div className="m-1 mb-3 " style={{ cursor: 'pointer' }}>
            <Select bordered={true}
              placeholder=" select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              value={product?.category ? product?.category : 'select a category'}
              onChange={(value) => setProduct((prev) => ({ ...prev, category: value }))}
              style={{ cursor: 'pointer' }} >
              {categories?.map(c => (
                <Option key={c._id} value={c.slug}>{c.name}</Option>
              ))}
            </Select>
          </div>
          <div className="p-3 w-50">
          <form encType="multipart/form-data" onSubmit={handlePhotoSubmut}>
        <div className="mb-3">
           
          <input
            type="file"
            className="form-control img img-responsive"
            placeholder="provide products image"
            name="image"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
            {
                product?.photo ? (
                    <div className="text-center border border-dark w-25 mt-3 ml-5">
                <img src={product.photo} alt={product.name} 
                height={200}/>
                    </div>
                ) : (
                    <div className="text-center border border-dark " >
                <img src="/images/noImage.png" alt={product.name} 
                height={200}/>
                    </div>
                )
            }
          <input
            type="submit"
            className=" m-3 btn btn-dark"
            value="post image"
          />
        </div>
      </form>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <input
            type="text"
            value={product?.name}
            placeholder="write a name"
            className="form-control"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            value={product.description}
            placeholder="write description"
            className="form-control"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={product.price}
            placeholder="write a price"
            className="form-control"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={product.quantity}
            placeholder="write quantity"
            className="form-control"
            name="quantity"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Select
            bordered={true}
            placeholder="Select Shipping"
            size="large"
            showSearch
            className="form-select mb-3"
            value={product?.shipping ? "yes" : "no"}
            onChange={(value) => {
              setProduct((prev) => ({ ...prev, shipping: value }));
            }}
          >
            <Option value={false}>No</Option>
            <Option value={true}>Yes</Option>
          </Select>
        </div>
        <div className="mb-3">
          <input
            type="submit"
            className=" m-3 btn btn-primary"
            value="Update product"
          />
          
        </div>
      </form>
      <button className="m-3 btn btn-danger " onClick={handleDeleteProduct}>
            Delete Product
          </button>
          </div>
        </div>
      </div>
    </div>

  </Layout>
  )
}

export default UpdateProduct