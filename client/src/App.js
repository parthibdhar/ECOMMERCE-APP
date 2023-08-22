
import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/AUTH/Register';
import Login from './pages/AUTH/Login';

import DashBoard from './pages/User/DashBoard';
import PrivateRoute from './Routes/PrivateRoute';
import ForgotPassword from './pages/AUTH/ForgotPassword';
import AdminProtectedRoutes from './Routes/AdminProtectedRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import AdminMenuUsers from './pages/Admin/AdminMenuUsers';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import Products from './pages/Admin/Products ';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import CartPage from './pages/CartPage';
import PaymentSuccess from './pages/PaymentSuccess';


function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/category/:slug' element={<CategoryProducts />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<DashBoard />} />
          <Route path='user/orders' element={<Orders />} />
         
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={< AdminProtectedRoutes />}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/users' element={<AdminMenuUsers/>}/>

        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
