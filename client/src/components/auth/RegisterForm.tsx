import React, { useState } from "react"
import { useSelector } from "react-redux"
import { IFormPropsRegister } from "../../interface/auth"
export const RegisterForm: React.FC<IFormPropsRegister> = ({
  postRegister,
}) => {
  const clerForm = useSelector((state: any) => state.generals.clearForm)
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    position: "chief",
  })

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const autoRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postRegister(form)
    if (clerForm) {
      setForm({
        name: "",
        last_name: "",
        email: "",
        password: "",
        position: "",
      })
    }
  }

  return (
    <form className='col s4' onSubmit={e => autoRegister(e)}>
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

      <div className='row '>
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

      <div className='row '>
        <p>
          <label>
            <input
              type='radio'
              name='position'
              value='chief'
              required
              onChange={changehandler}
            />
            <span>Chief</span>
          </label>

          <label>
            <input
              type='radio'
              name='position'
              value='maneger'
              required
              onChange={changehandler}
            />
            <span>Maneger</span>
          </label>

          <label>
            <input
              type='radio'
              name='position'
              value='storekeeper'
              required
              onChange={changehandler}
            />
            <span>Storekeeper</span>
          </label>
        </p>
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
