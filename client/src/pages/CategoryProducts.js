import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProducts = () => {
  const port = process.env.REACT_APP_API;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const Navigate = useNavigate();
  // getProducts By Category
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/products/pruduct-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) getProductsByCategory();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} Results found</h6>
        <div className="row">
          <div className="col-md-9 ofset-1">
            <div className="d-flex flex-wrap">
              {products?.map((product) => (
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
                    <p className="card-text">
                      {product?.description.substring(0, 30)}
                    </p>
                    <p className="card-text"> $ {product?.price}</p>
                    <button
                      className="btn btn-primary ml-1"
                      onClick={() => Navigate(`/product/${product.slug}`)}
                    >
                      More Details...
                    </button>
                    <button className="btn btn-secondary ml-1">
                      Add to Cart
                    </button>
                    {/* <div className="m-2 p-2">
                      {products && products.length < total && (
                        <button
                          className="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((prev) => prev + 1);
                          }}
                        >
                          {loading ? "loading..." : "loadmore"}
                        </button>
                      )}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
