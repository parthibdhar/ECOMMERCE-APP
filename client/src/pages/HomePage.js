import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'

import axios from 'axios'
import toast from 'react-hot-toast'
import {Checkbox} from 'antd'

const HomePage = () => {

  const port = process.env.REACT_APP_API;
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [checked, setChecked] = useState([])



//get all categories
const getAllCategories = async () => {
  try {
    const { data } = await axios.get(
      `${port}/api/v1/category/getAll-Categories`
    );
    console.log(data);

    if (data.success) setCategories(data.allCategories);
  } catch (error) {
    console.log(error);
    toast.error("something went wrong while getting all categories");
  }
};

useEffect(() => {
  getAllCategories();
  //eslint-disable-next-line
}, []);

  //get all Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/products/get-products`);
      console.log(data);

      if (data.success) {
        setAllProducts(data.products);
        console.log(allProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);

  const handleFilter = async (value, cat) => {
    let all = [...checked]
    if (value) all.push(cat);
    else all = all.filter(c => c!== cat);
    setChecked(all);
  }
  return (
    <Layout title={'All Products - Best offers'}>
     <div className="row mt-3">
      <div className="col-md-2">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column m-3">
        {categories?.map(c => (
          <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c.slug)}>
            {c.name}
          </Checkbox>
        ))}
        </div>
      </div>
      <div className="col-md-9">
        {JSON.stringify(checked, null, 4)}
          <h1 className="text-center">All Products List</h1>
          
          <div className="d-flex flex-wrap">
            {allProducts?.map((product) => (
             
                <div className="card m-2" key={product._id} style={{ width: "18rem" }}>
                  <img
                    src=
                    {
                      product?.photo
                        ?  product.photo
                        : `/images/noImage.png` 
                    }
                    className="card-img-top"
                    alt={product?.name}
                    height="250"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product?.name}</h5>
                    <p className="card-text">{product?.description}</p>
                    <button  className="btn btn-primary ml-1">More Details...</button>
                    <button  className="btn btn-secondary ml-1">Add to Cart</button>
                  </div>
                </div>
              
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage