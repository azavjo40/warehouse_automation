import React from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "../../redux/auth/authAcsions"
import { INavbarProps } from "../../interface/navbar"
import { getStorage } from "../../utils/storage"
export const Navbar: React.FC<INavbarProps> = ({ isAuthUser }) => {
  const dispatch = useDispatch()
  const storage: any = getStorage()
  if (isAuthUser && storage.user) {
    return (
      <nav>
        <div className='nav-wrapper  indigo darken-4 p_r_l'>
          <NavLink to='/' className='brand-logo hide-on-med-and-down'>
            {storage.user &&
              `${storage.user.position.toLocaleUpperCase()}:  ${
                storage.user.name
              }`}
          </NavLink>
          <ul id='nav-mobile' className='right '>
            {storage.user.permissions === "true" && (
              <>
                <li>
                  <NavLink to={`/shipment/product`}>Shipment Product</NavLink>
                </li>
                <li>
                  <NavLink to='/dispatch/product'>Dispatch Product</NavLink>
                </li>
                {storage.user.position !== "storekeeper" && (
                  <li>
                    <NavLink to='/user/working'>User</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to='/history/product'>History</NavLink>
                </li>
              </>
            )}
            <li onClick={() => dispatch(logout())}>
              <NavLink to='/login'>Log out</NavLink>
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
