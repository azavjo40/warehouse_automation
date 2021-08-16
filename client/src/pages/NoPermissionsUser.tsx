import React from "react"
import { getStorage } from "../utils/storage"
import { Loading } from "../components/index"
export const NoPermissionsUser: React.FC = () => {
  const storage: any = getStorage()
  return (
    <div className='container'>
      <Loading text={`${storage.name} you do not have permission !`} />
    </div>
  )
}
