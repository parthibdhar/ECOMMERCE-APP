
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

function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<DashBoard />} />
        </Route>
        <Route path='/dashboard' element={< AdminProtectedRoutes />}>
          <Route path='admin' element={<DashBoard/>}/>

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
