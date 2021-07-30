import React from "react"
import { getStorage } from "../../utils/storage"
export const CartNoPermissionsUser: React.FC = () => {
  const storage: any = getStorage()
  return (
    <div className='cartNoPermissionsUser '>
      <div className='preloader-wrapper big active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
      <p>{storage.name} you do not have permission !</p>
    </div>
  )
}
