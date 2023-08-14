
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const port = process.env.REACT_APP_API;
    // const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    //get product
    const getProduct = async (req, res) => {
try {
    const {data}  = await axios.get(`${port}/api/v1/products/get-products/${params.slug}`)
    if(data?.success){
        console.log(data.product._id, data.product.category);
        setProduct(data.product)
        getSimilarProduct(data.product._id, data.product.category)
    }
} catch (error) {
    console.log(error);
}
    }

    useEffect(() => {
       if(params?.slug) getProduct()
    }, [params.slug]);

    //get similar product
    const getSimilarProduct = async (pId,cat) => {
try {
    const {data} = await axios.get(`${port}/api/v1/products/similarProduct/${pId}/${cat}`)
    if(data?.success){
        console.log(data.products);
        setRelatedProducts(data.products)
    }
} catch (error) {
    console.log(error);
}
    }
  return (
    <Layout>
        
      <div className="row container mt-2">
        <div className="col-md-6">
        <img
                    src=
                    {
                      product?.photo
                        ?  product.photo
                        : `/images/noImage.png` 
                    }
                    className="card-img-top"
                    alt={product?.name}
                    height="350"
                    width="350"
                  />
        </div>
        <div className="col-md-6 ">
        <h1 className='text-center'>Product Details</h1>
        <h4>name: {product.name}</h4>
        <h4>description: {product.description}</h4>
        <h4>price: {product.price}</h4>
        <h4>category: {product.category}</h4>
        <h4>shipping: {product.shipping}</h4>
        <button className="btn btn-secondary ml-1">
                    Add to Cart
                  </button>
        </div>
      </div>
      <hr />
      <div className=" container">
       
        <u> <h4 >Similar products</h4></u>
         <br />
        {relatedProducts.length < 1 && <p className='text-center'>No Similar Product Found</p>}
      <div className="d-flex flex-wrap">
            {relatedProducts?.map((product) => (
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
                  <button className="btn btn-secondary ml-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr />
      </div>

    </Layout>
  )
}

export default ProductDetails