import React from "react"
import { ITypesFormRegister } from "../interface/auth"
import { RegisterForm } from "../components/index"
import { useDispatch } from "react-redux"
import { authRegister } from "../redux/auth/authAcsions"
export const Register: React.FC = () => {
  const dispatch = useDispatch()
  const postRegister = (form: ITypesFormRegister): void => {
    dispatch(authRegister(form))
  }

  return (
    <div className='container p_t_30'>
      <RegisterForm postRegister={postRegister} />
    </div>
  )
}
