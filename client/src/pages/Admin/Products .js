import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";

const Products = () => {
  const port = process.env.REACT_APP_API;
  const [allProducts, setAllProducts] = useState([]);
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
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          
          <div className="d-flex flex-wrap">
            {allProducts?.map((product) => (
             
              <Link
                to={`//localhost:3000/dashboard/admin/product/${product?.slug}`}
                key={product?._id}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
