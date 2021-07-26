import React from "react"
import { useDispatch } from "react-redux"
import { CartReceiptProduct } from "../components/index"
import { ITypesFormProduct } from "../interface/product"
import { postReceipt } from "../redux/product/productAcsions"
export const ReceiptProduct: React.FC = () => {
  const dispatch = useDispatch()
  function receiptHandler(form: ITypesFormProduct) {
    dispatch(postReceipt(form))
  }
  return (
    <div className='container'>
      <CartReceiptProduct receiptHandler={receiptHandler} />
    </div>
  )
}
