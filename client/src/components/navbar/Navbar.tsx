import React from "react"
import { NavLink } from "react-router-dom"

interface Props {
  isAuthUser: boolean
}

export const Navbar: React.FC<Props> = ({ isAuthUser }) => {
  return (
    <>
      <nav>
        <div className='nav-wrapper  indigo darken-4 p_r_l'>
          {isAuthUser ? (
            <>
              <NavLink to='/home' className='brand-logo hide-on-med-and-down'>
                Qrocery warehouse
              </NavLink>
              <ul id='nav-mobile' className='right '>
                <li>
                  <NavLink to='/home'>Home</NavLink>
                </li>
                <li>
                  <NavLink to='/product'>Product</NavLink>
                </li>
                <li>
                  <NavLink to='/'>Log out</NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul id='nav-mobile' className='right '>
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
              <li>
                <NavLink to='/login'>Log in</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}
