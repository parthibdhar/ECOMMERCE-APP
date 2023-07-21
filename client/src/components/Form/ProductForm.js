import React, { useEffect } from "react";


const ProductForm = ({ handleSubmit, product, setProduct, image, setImage, base64Image, setBase64Image }) => {
  const handleChange = (e) => {
    console.log("target", e.target.name);
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const imageSeleted = (e) => {
    setImage(e.target.files[0])
    // console.log("img target: ", image);
    // if (image) {
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onloadend = () => {
    //   const base64Url = reader.result;
    //   console.log("uuurrrlll: ", base64Url);
    //   setBase64Image(base64Url);
    //   console.log("Base64Image_url: " + typeof (base64Url));
    // };
   
      
  
    // }

  }

  useEffect(() => {
    console.log('State after setImage:', image); // This will show the updated state

    console.log('State after baseurl:', base64Image); // This will show the updated state


  }, [image]);
  console.log("after change: ", product);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            placeholder="provide products image"
            name='image'
            onChange={imageSeleted}
          />
          {/* <button onClick={uploadImage}> dao</button> */}
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
