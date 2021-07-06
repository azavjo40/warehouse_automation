import React from "react"
import { TypesFormRegister } from "../components/auth/interface"
import { RegisterForm } from "../components/_index"
import { useDispatch } from "react-redux"
import { authRegister } from "../redux/auth/authAcsions"
export const Register: React.FC = () => {
  const dispatch = useDispatch()
  const postRegister = (form: TypesFormRegister): void => {
    dispatch(authRegister(form))
  }

  return (
    <div className='container p_t_30'>
      <RegisterForm postRegister={postRegister} />
    </div>
  )
}
