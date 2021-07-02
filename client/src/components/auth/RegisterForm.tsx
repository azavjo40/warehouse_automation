import React, { useState } from "react"
import { FormProps } from "../../interface_client/auth"
export const RegisterForm: React.FC<FormProps> = ({ postRegister }) => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    position: "",
  })

  console.log(form)
  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      className='col s4'
      onSubmit={() => {
        postRegister(form)
      }}
    >
      <div className='row'>
        <div className='input-field col s6'>
          <input
            placeholder='Enter name'
            type='text'
            className='validate'
            required
            name='name'
            value={form.name}
            onChange={changehandler}
          />
        </div>

        <div className='input-field col s6'>
          <input
            type='text'
            className='validate'
            placeholder='Enter last_name'
            required
            name='last_name'
            value={form.last_name}
            onChange={changehandler}
          />
        </div>
      </div>

      <div className='row'>
        <div className='input-field col s12'>
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
      </div>

      <div className='row'>
        <div className='input-field col s12'>
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
