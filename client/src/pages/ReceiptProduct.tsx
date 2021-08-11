import React from "react"
import { useDispatch } from "react-redux"
import { CartReceiptProduct } from "../components/index"
import { ITypesFormProduct } from "../interface/product"
import { postReceipt } from "../redux/product/productAcsions"
import { getStorage } from "../utils/storage"
export const ReceiptProduct: React.FC = () => {
  const storage = getStorage()
  const dispatch = useDispatch()
  function receiptHandler(form: ITypesFormProduct) {
    console.log(form)
    dispatch(postReceipt(form))
  }
  return (
    <div className='container'>
      <CartReceiptProduct receiptHandler={receiptHandler} storage={storage} />
    </div>
  )
}
