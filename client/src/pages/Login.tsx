import React from "react"

export const Login: React.FC = () => {
  return (
    <div className='container p_t_30'>
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
    </div>
  )
}
