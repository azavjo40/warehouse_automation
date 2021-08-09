import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { historyProduct } from "../redux/product/productAcsions"
import { CarthistoryProduct } from "../components/index"
export const HistoryProduct: React.FC = () => {
  const product = useSelector<any>(state => state.product.product)
  const dispatch = useDispatch()
  useEffect(() => dispatch(historyProduct() as any), [dispatch])
  return (
    <div className='container '>
      <CarthistoryProduct product={product} />
    </div>
  )
}
