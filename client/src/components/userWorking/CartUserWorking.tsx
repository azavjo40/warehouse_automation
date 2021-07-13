import React from "react"
export const CartUserProduct: React.FC<any> = ({item}) => {
  // window.confirm()
  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
  }
  return (
              <li className='collection-item working' >
                <div>
                  <span>
                    {`${item.position && item.position.toLocaleUpperCase()}:`}{" "}
                    {item.name}
                  </span>

                  <span className='secondary-content flex-icone'>
                    <i className='material-icons'>delete</i>Delete
                  </span>
                  <div className='switch secondary-content flex-icone'>
                    <label>
                      <input type='checkbox' onChange={changehandler} />
                      <span className='lever'> </span>Block
                    </label>
                  </div>
                </div>
              </li>
  )
}
