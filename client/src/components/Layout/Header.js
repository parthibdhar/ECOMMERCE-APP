import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md'
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'

const Header = () => {
  const [auth, setAuth] = useAuth()
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth')
    toast.success("logout success")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand" href="#"> <MdShoppingBasket /> FASH-SToRe</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <NavLink to="/" className="nav-link " > Home </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink to="/category" className="nav-link" >Category </NavLink>
            </li>
            {
              !auth.user ? (<>


                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" >Sign up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" >Sign in</NavLink>
                </li>
              </>) : (<>

                <li className="nav-item">
                  <NavLink onClick={handleLogOut} to="/login" className="dropdown-item" > Log Out</NavLink>
                </li>
              </>)
            }
            <li className="nav-item">
              <NavLink to={`dashboard/${
                auth?.user?.role === true ? "admin" : "user"
              }`} className="nav-link" >DashBoard</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" >Cart (0) </NavLink>
            </li>

          </ul>

        </div>
      </nav>

    </>
  )
}

export default Header