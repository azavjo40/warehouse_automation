import React from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "../../redux/auth/authAcsions"
import { NavbarProps } from "./interface"
import { getStorage } from "../../utils/index"
export const Navbar: React.FC<NavbarProps> = ({ isAuthUser }) => {
  const dispatch = useDispatch()
  const storage: any = getStorage()
  if (isAuthUser) {
    return (
      <>
        <nav>
          <div className='nav-wrapper  indigo darken-4 p_r_l'>
            <>
              <NavLink to='/home' className='brand-logo hide-on-med-and-down'>
                {storage.user &&
                  `${storage.user.position.toLowerCase()} :  ${storage.user.name.toLowerCase()}`}
              </NavLink>
              <ul id='nav-mobile' className='right '>
                {storage.permissions === "true" && (
                  <>
                    <li>
                      <NavLink to='/home'>Home</NavLink>
                    </li>
                    <li>
                      <NavLink to='/product'>Product</NavLink>
                    </li>
                  </>
                )}
                <li onClick={() => dispatch(logout())}>
                  <NavLink to='/'>Log out</NavLink>
                </li>
              </ul>
            </>
          </div>
        </nav>
      </>
    )
  } else {
    return (
      <>
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
      </>
    )
  }
}
