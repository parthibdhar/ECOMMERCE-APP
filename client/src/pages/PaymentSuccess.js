import React, { useEffect } from "react";
import { Box, Button, Heading, Text, VStack, useQuery } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const port = process.env.REACT_APP_API;
    const searchQuary = useSearchParams()[0];
   const refNum = searchQuary.get("reference");
   const [cart, setCart] = useCart();
   const [auth] = useAuth();
   const navigate = useNavigate()

   const orderDbMange = async (req, res) => {
    console.log("hi");
    console.log(cart[0]);
    console.log(auth.user);
    const {data} =  await axios.patch(`${port}/api/v1/products/orderd_db_update`,{
      cart,refNum
    })
    if(data?.success)
    {
      console.log(data.order);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("payment completed successfully");
      navigate("/dashboard/user/orders")
    }
   };

   useEffect(() =>{
    console.log(cart[0]);
    setCart(cart);
    if(cart[0] && refNum) orderDbMange();
    
   },[cart, auth, refNum]);
  return (
    <Box h='100vh' justifyContent='center'>
      <VStack>
        <Heading textTransform='uppercase'>Order Successfull</Heading>
        <Text> Reference No. {refNum} </Text>

        <Button colorScheme='teal' variant='outline'
        onClick={orderDbMange}>
    Go Back
  </Button>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
