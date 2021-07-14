import React, { useEffect, useState } from "react"

export const CartUserProduct: React.FC<any> = ({
  item,
  deleteWorker,
  blockWorker,
}) => {
  const [checked, setChecked] = useState<boolean>()
  useEffect(() => {
    if (item.permissions === "false") setChecked(false)
    else setChecked(true)
  }, [checked, item.permissions])

  const changehandler = (): void => {
    const confirm: boolean = window.confirm("Are you sure ?")
    if (item.permissions === "true" && confirm) blockWorker(item._id, false)
    if (item.permissions === "false" && confirm) blockWorker(item._id, true)
  }

  return (
    <li className='collection-item working'>
      <div>
        <span>
          {`${item.position && item.position.toLocaleUpperCase()}:`} {item.name}
        </span>

        <span
          className='secondary-content flex-icone'
          onClick={() => deleteWorker(item._id)}
        >
          <i className='material-icons'>delete</i>Delete
        </span>
        <div className='switch secondary-content flex-icone'>
          <label>
            <input type='checkbox' checked={checked} onChange={changehandler} />
            <span className='lever'> </span>Block
          </label>
        </div>
      </div>
    </li>
  )
}
