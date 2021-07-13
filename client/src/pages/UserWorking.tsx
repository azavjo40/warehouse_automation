import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CartUserProduct } from "../components/index"
import { usersWorking } from "../redux/auth/authAcsions"
export const UserWorking: React.FC = () => {
  const working: any = useSelector<any>(state => state.auth.users)
  const dispatch = useDispatch()
  useEffect(() => dispatch(usersWorking()) as any)
  return (
    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <span>Users</span>
        </li>
        {working.map((item: any) => {
          return <CartUserProduct key={item._id} item={item} />
        })}
      </ul>
    </div>
  )
}
