import React from "react"
import { LoginForm } from "../components/index"
import { TypesFormLogin } from "../components/auth/interface"
import { useDispatch } from "react-redux"
import { authLogin } from "../redux/auth/authAcsions"
export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const postLogin = (form: TypesFormLogin): void => {
    dispatch(authLogin(form))
  }

  return (
    <div className='container p_t_30'>
      <LoginForm postLogin={postLogin} />
    </div>
  )
}
