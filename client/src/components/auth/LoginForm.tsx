import React from "react"

export const LoginForm: React.FC = () => {
  return (
    <form className='col s4'>
      <div className='row'>
        <div className='input-field col s6'>
          <input
            placeholder='Enter email'
            type='email'
            className='validate'
            required
          />
        </div>

        <div className='input-field col s6'>
          <input
            type='password'
            className='validate'
            placeholder='Enter password'
            required
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
