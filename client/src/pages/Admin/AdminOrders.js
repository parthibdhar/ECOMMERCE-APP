import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const port = process.env.REACT_APP_API;
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // get all orders of this user
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${port}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //order status change
  const handleStatusChange = async (orderId, status) => {
    const { data } = await axios.put(
      `${port}/api/v1/auth/order-status-update/${orderId}`,
      { status }
    );
    getOrders();
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
            <TableContainer className="my-3">
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
                      <React.Fragment key={i}>
                        <Tr >
                          <Td>{i + 1}</Td>
                          <Td>
                            <Select
                              bordered={false}
                              onChange={(value) =>
                                handleStatusChange(o._id, value)
                              }
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Select.Option key={i} value={s}>
                                  {s}
                                </Select.Option>
                              ))}
                            </Select>
                          </Td>
                          <Td>{o?.buyer?.name}</Td>
                          <Td>{moment(o?.createdAt).fromNow()}</Td>
                          <Td>
                            {o?.payment?.razorpay_payment_id
                              ? "Success"
                              : "Failed"}
                          </Td>
                          <Td>{o?.products?.length}</Td>
                        </Tr>
                        <div className="container  my-3">
                          {o?.products?.map((product, i) => (
                            <div
                              className="row mb-2 p-3 card flex-row border border-white"
                              key={i}
                            >
                              <div className="col-md-4">
                                <img
                                  src={
                                    product?.photo
                                      ? product.photo
                                      : `/images/noImage.png`
                                  }
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
                              </div>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
