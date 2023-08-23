import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminMenuUsers = () => {
  return (
    <Layout title="Dashboard - All Users Ecommerce - App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All User</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMenuUsers;
