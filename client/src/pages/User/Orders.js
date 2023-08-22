import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";

const Orders = () => {
  const port = process.env.REACT_APP_API;
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title="Dashboard - Orders Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"><u>Your Orders</u></h1>
            <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Status</Th>
                      <Th>Buyers</Th>
                      <Th>Date</Th>
                      <Th>Payment</Th>
                      <Th>Quantity</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders?.map((o, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{i + 1}</Td>
                          <Td>{o?.status}</Td>
                          <Td>{o?.buyer?.name}</Td>
                          <Td>{moment(o?.createdAt).fromNow()}</Td>
                          <Td>
                            {o?.payment?.razorpay_payment_id
                              ? "Success"
                              : "Failed"}
                          </Td>
                          <Td>{o?.products?.length}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {/* <p>{JSON.stringify(orders, null, 4)}</p> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
