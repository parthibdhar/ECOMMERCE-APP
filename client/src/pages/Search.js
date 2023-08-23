import  Layout  from '../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../context/searchProductContext'

const Search = () => {
    const [values, setValues] = useSearch()
  return (
    
        <Layout title='search results'>
                <div className="container">
                    <div className="text-center">
                        <h1>Search result</h1>
                        <h6>{values?.results.length < 1 ? 'no products found ' :
                        `found ${values.results.length}`
                        }</h6>
                        
          <div className="d-flex flex-wrap mt-4" >
            {values?.results?.map((product) => (
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
                    </div>
                </div>
        </Layout>
  
  );
}

export default Search