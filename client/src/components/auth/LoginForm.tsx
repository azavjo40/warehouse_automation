import React, { useState } from "react"
import { useSelector } from "react-redux"
import { IFormPropsLogin } from "../../interface/auth"

export const LoginForm: React.FC<IFormPropsLogin> = ({ postLogin }) => {
  const clerForm = useSelector((state: any) => state.generals.clearForm)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const autoRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postLogin(form)
    if (clerForm) setForm({ email: "", password: "" })
  }

  return (
    <form className='col s4' onSubmit={autoRegister}>
      <div className='row'>
        <div className='input-field col s6'>
          <input
            placeholder='Enter email'
            type='email'
            className='validate'
            required
            name='email'
            value={form.email}
            onChange={changehandler}
          />
        </div>

        <div className='input-field col s6'>
          <input
            placeholder='Enter password'
            type='password'
            className='validate'
            required
            name='password'
            value={form.password}
            onChange={changehandler}
          />
        </div>
      </div>

      <button
        className='btn waves-effect waves-light right'
        type='submit'
        name='action'
      >
        Submit
        <i className='material-icons right'>send</i>
      </button>
    </form>
  )
}
