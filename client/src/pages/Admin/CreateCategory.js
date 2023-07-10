import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getAll-Categories`
      );
      console.log(data);

      if (data.success) setCategories(data.allCategories);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title="Dashboard - Create Category Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <hr />
            <div className="w-75">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Aciton</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr>
                      <td>{c.name}</td>
                      <td>
                        <button className="btn btn-primary">edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
