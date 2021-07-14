import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CartUserProduct } from "../components/index"
import {
  userBlockWorker,
  userDeleteWorker,
  usersWorking,
} from "../redux/auth/authAcsions"
import { getStorage } from "../utils/index"

export const UserWorking: React.FC = () => {
  const storage: any = getStorage()
  const working: any = useSelector<any>(state => state.auth.users)
  const dispatch = useDispatch()
  useEffect(() => dispatch(usersWorking()) as any)
  function deleteWorker(_id: string) {
    const confirm: boolean = window.confirm("Are you sure ?")
    if (confirm) {
      dispatch(userDeleteWorker(_id, storage.userId))
    }
  }

  function blockWorker(_id: string, permissions: boolean) {
    dispatch(userBlockWorker(_id, permissions, storage.userId))
  }
  return (
    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <span>Working</span>
        </li>
        {working.map((item: any) => {
          return (
            <CartUserProduct
              key={item._id}
              item={item}
              deleteWorker={deleteWorker}
              blockWorker={blockWorker}
            />
          )
        })}
      </ul>
    </div>
  )
}
