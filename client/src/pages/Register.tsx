import React from "react"

export const Register: React.FC = () => {
  return (
    <div className='container p_t_30'>
      <form className='col s4'>
        <div className='row'>
          <div className='input-field col s6'>
            <input
              placeholder='Enter name'
              type='text'
              className='validate'
              required
            />
          </div>

          <div className='input-field col s6'>
            <input
              type='text'
              className='validate'
              placeholder='Enter last_name'
              required
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
