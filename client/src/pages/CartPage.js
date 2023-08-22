import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const port = process.env.REACT_APP_API;

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const Navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);


  //total price of carts items\
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total += item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

    } catch (error) {
      console.log(error);
    }
  };

  // remove item from cart
  const removeCartItem = (product) => {
    try {
      console.log("Removing");
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === product);
      console.log(index);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      console.log("sesh");
    } catch (error) {
      console.log(error);
    }
  };

  
  //Handle Payments
  const handlePayment = async () => {
    try {
      const { data: { key } } = await axios.get(`${port}/api/v1/getKey`)
      console.log("key: ", key);
      const amount = totalPrice();
      console.log("totalPrice " + amount);
      const { data: { order } } = await axios.post(
        `${port}/api/v1/products/razorpay/checkout`, {
        amount
      }
      );
      console.log(order);

      var options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Parthib Dhar",
        description: "RazorPay Transaction FashStore",
        image: "https://avatars.githubusercontent.com/u/91363085?s=400&u=7c1be16e02fcf73e0de8f21ea42abc5d2d146c70&v=4",
        order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${port}/api/v1/products/razorpay/PaymentVerification`,
        prefill: {
          name: `${auth?.token && auth?.user?.name}`,
          email: `${auth?.token && auth?.user?.email}`,
          contact: `${auth?.token && auth?.user?.phone}`
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#565656"
        }
      };
      const razor = new window.Razorpay(options);
      console.log(razor);
      console.log(options.callback_url);
     await razor.open();
      console.log(options.callback_url);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light 0 p-2 m-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `you have ${cart?.length} items in your cart ${auth?.token ? "" : "please log in checkout..."
                }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-8">
            {cart?.map((product) => (
              <div className="row mb-2 p-3 card flex-row" key={product._id}>
                <div className="col-md-4">
                  <img
                    src={product?.photo ? product.photo : `/images/noImage.png`}
                    className="card-img-top"
                    alt={product?.name}
                    height={"150"}
                    width="100"
                  />
                </div>
                <div className="col-md-8">
                  <p>{product.name}</p>
                  <p>{product.description.substring(0, 30)}</p>
                  <p>{product.price} </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | chekout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Adress</h4>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => Navigate("/dashboard/user/profile")}
                  >
                    Updated User
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => Navigate("/dashboard/user/profile")}
                  >
                    Update Adress
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      Navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!cart.length ? (
                ""
              ) : (
                <>

                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePayment}
                    disabled={!auth?.user?.address}
                  >
                    {loading ? "processing..." : "Make Payment "}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
