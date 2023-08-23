import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const port = process.env.REACT_APP_API;

  //Handle Form for create categories
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("dhuksi suna");
      const { data } = await axios.post(
        `${port}/api/v1/category/create-Category`,
        { name: catName }
      );
      if (data?.success) {
        toast.success(`${data.category.name} created successfully}`);
        getAllCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //Handle Form for update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("selected: " + selected);
    try {
      const { data } = await axios.put(
        `${port}/api/v1/category/upadate-category/${selected}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${catName} updated to ${updatedName} successfully`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else toast.error(data.msg);
    } catch (error) {
      console.log(error);
      toast.error("oops!!! unable to update something went wrong");
    }
  };
  
  
  //Handle Form for update categories
  const handleDelete = async (pId) => {
    console.log("id: " + pId);
    try {
      const { data } = await axios.delete(
        `${port}/api/v1/category/delete-Category/${pId}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${catName} category is deleted successfully`);
        getAllCategories();
      } else toast.error(data.msg);
    } catch (error) {
      console.log(error);
      toast.error("oops!!! unable to update something went wrong");
    }
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${port}/api/v1/category/getAll-Categories`
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
  console.log(catName);
  return (
    <Layout title="Dashboard - Create Category Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={catName}
                setValue={setCatName}
              />
            </div>
            <hr />
            <div className="w-75">
              <table className="table table-striped">
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
                        <button
                          className="btn btn-primary mr-2 ml-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c._id);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger mr-2 ml-2"
                        onClick={() => {handleDelete(c._id)}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
