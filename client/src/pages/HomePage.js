import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/FilterByPrices";

const HomePage = () => {
  const port = process.env.REACT_APP_API;
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)



  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/category/getAll-Categories`
      );
    

      if (data.success) setCategories(data.allCategories);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
    //eslint-disable-next-line
  }, []);

  //get all Products
  const getAllProducts = async () => {
    try {
    setLoading(true);
      const { data } = await axios.get(`${port}/api/v1/products/product-list/${page}`);
    setLoading(false)
      if (data.success) {
        setAllProducts(data.products);
        
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    if(checked.length === 0 || radio.length === 0) getAllProducts();
   
  }, [checked, radio]);



  // get total count
  const getTotal = async () => {
    try {
      const {data} = await axios.get(`${port}/api/v1/products/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
      
    }
      }

      //loadmore

      useEffect(() => {
        if (page === 1 ) return ;
        loadMore();
       
      }, [page]);
      const loadMore = async () =>{
        try {
          setLoading(true)
          const {data} = await axios.get((`${port}/api/v1/products/product-list/${page}`))
          if(data?.success) {
            setLoading(false)
            setAllProducts([...allProducts, ...data?.products ])
          }
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      }
  
  //get filter Products
  const getFilterProducts = async () => {
try {
  const {data} = await axios.post(`${port}/api/v1/products/product-filters`,{checked, radio})
  setAllProducts(data?.products);
} catch (error) {
  console.log(error);
  toast.error("something went wrong while getting filtered product")
}
  }

  useEffect(() => {
    if(checked.length || radio.length) getFilterProducts();

  }, [checked, radio]);

  const handleFilter = async (value, cat) => {
    let all = [...checked];
    if (value) all.push(cat);
    else all = all.filter((c) => c !== cat);
    setChecked(all);
  };
  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          {/* filter by category */}

          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column m-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c.slug)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/*  filter by price */}

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column m-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column m-3">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          {JSON.stringify(checked, null, 4)}
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex flex-wrap">
            {allProducts?.map((product) => (
              <div
                className="card m-2"
                key={product._id}
                style={{ width: "18rem" }}
              >
                <img
                  src={product?.photo ? product.photo : `/images/noImage.png`}
                  className="card-img-top"
                  alt={product?.name}
                  height="250"
                />
                <div className="card-body">
                  <h5 className="card-title">{product?.name}</h5>
                  <p className="card-text">{product?.description.substring(0,30)}</p>
                  <p className="card-text"> $ {product?.price}</p>
                  <button className="btn btn-primary ml-1">
                    More Details...
                  </button>
                  <button className="btn btn-secondary ml-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
            {allProducts && allProducts.length < total && (
              <button className="btn btn-warning" onClick={(e) => {
                e.preventDefault();
                setPage((prev) => prev+1)
              }}>
                {loading ? "loading..." : "loadmore"}
              </button>
            )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
