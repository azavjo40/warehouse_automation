import React from "react"
import { TypesForm } from "../interface_client/auth"
import { RegisterForm } from "../components/_index"
export const Register: React.FC = () => {
  const postRegister = (form: TypesForm): void => {
    console.log(form)
  }

  return (
    <div className='container p_t_30'>
      <RegisterForm postRegister={postRegister} />
    </div>
  )
}
