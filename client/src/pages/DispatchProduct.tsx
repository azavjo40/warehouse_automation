import React from "react"
import { useDispatch } from "react-redux"
import { CartDispatchProduct } from "../components/index"
import { ITypesFormProduct } from "../interface/product"
import { postDispatch } from "../redux/product/productAcsions"
export const DispatchProduct: React.FC = () => {
  const dispatch = useDispatch()
  function dispatchHandler(form: ITypesFormProduct) {
    dispatch(postDispatch(form))
  }
  return (
    <div className='container'>
      <CartDispatchProduct dispatchHandler={dispatchHandler} />
    </div>
  )
}
