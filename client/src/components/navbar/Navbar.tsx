import React from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "../../redux/auth/authAcsions"
import { INavbarProps } from "../../interface/navbar"
import { getStorage } from "../../utils/storage"
export const Navbar: React.FC<INavbarProps> = ({ isAuthUser }) => {
  const dispatch = useDispatch()
  const storage: any = getStorage()
  if (isAuthUser && storage) {
    return (
      <nav>
        <div className='nav-wrapper  indigo darken-4 p_r_l'>
          <NavLink to='/' className='brand-logo hide-on-med-and-down'>
            {storage &&
              `${storage.position.toLocaleUpperCase()}:  ${storage.name}`}
          </NavLink>
          <ul id='nav-mobile' className='right '>
            {storage.permissions === "true" && (
              <>
                <li>
                  <NavLink to={`/receipt/product`}>Get Product</NavLink>
                </li>
                <li>
                  <NavLink to='/dispatch/product'>Post Product</NavLink>
                </li>
                {storage.position !== "storekeeper" && (
                  <li>
                    <NavLink to='/user/working'>User</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to='/history/product'>History</NavLink>
                </li>

                <li>
                  <NavLink to='/over/head/pdf'>Pdf Doc</NavLink>
                </li>
              </>
            )}
            <li onClick={() => dispatch(logout())}>
              <NavLink to='/login'>Log Out</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  } else {
    return (
      <nav>
        <div className='nav-wrapper  indigo darken-4 p_r_l'>
          <ul id='nav-mobile' className='right '>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
            <li>
              <NavLink to='/login'>Log in</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
