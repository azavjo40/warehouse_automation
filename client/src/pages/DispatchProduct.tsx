import React from "react"
import { useDispatch } from "react-redux"
import { CartDispatchProduct } from "../components/index"
import { ITypesFormProduct } from "../interface/product"
import { postDispatch } from "../redux/product/productAcsions"
import { getStorage } from "../utils/storage"
export const DispatchProduct: React.FC = () => {
  const storage = getStorage()
  const dispatch = useDispatch()
  function dispatchHandler(form: ITypesFormProduct) {
    dispatch(postDispatch(form))
  }
  return (
    <div className='container'>
      <CartDispatchProduct
        dispatchHandler={dispatchHandler}
        storage={storage}
      />
    </div>
  )
}
