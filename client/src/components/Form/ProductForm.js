import { Select } from "antd";
import React from "react";

const ProductForm = ({
  handleSubmit,
  product,
  setProduct,
  image,
  setImage,

}) => {
  const { Option } = Select;
  const handleChange = (e) => {
    console.log("target", e.target.name);
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const imageSeleted = (e) => {
    setImage(e.target.files[0]);
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
  };
  console.log("after change: ", product);
  return (
    <>
      <form encType="multipart/form-data">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            placeholder="provide products image"
            name="image"
            onChange={imageSeleted}
          />

          <input
            type="submit"
            className=" m-3 btn btn-dark"
            value="post image"
          />
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={product.name}
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
            value="create product"
          />
        </div>
      </form>
    </>
  );
};

export default ProductForm;
