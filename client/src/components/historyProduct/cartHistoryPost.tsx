import React from "react"
import { useDispatch } from "react-redux"
import {
  overHeadPdfDispatch,
  deleteHistoryProduct,
} from "../../redux/product/productAcsions"
export const CartHistoryPost: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch()
  const copyPdf = (item: any) => {
    const confirm: boolean = window.confirm("Do you wont copy?")
    if (confirm) dispatch(overHeadPdfDispatch(item))
  }
  const deleteProduct = (_id: any) => {
    const confirm: boolean = window.confirm("Do you wont delete product?")
    if (confirm) dispatch(deleteHistoryProduct({ post: _id }))
  }
  return (
    <div className='turnTheQueue'>
      {product &&
        product.sendProduct.map((item: any) => {
          return (
            <ul className='collection ' key={item._id}>
              <li className='collection-item'>
                {`${item.sender_product}
                    driver: ${item.driver} purveyor: ${item.purveyor} type:  ${
                  item.type_commodity
                } product_name: ${item.product_name} items:  ${item.quantity} 
                    date: ${new Date(item.date).toLocaleDateString()}`}
              </li>
              <li>
                <span
                  className=' badge red cursor'
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </span>
                <span
                  className='badge blue cursor'
                  onClick={() => copyPdf(item)}
                >
                  Copy pdf
                </span>
              </li>
            </ul>
          )
        })}
    </div>
  )
}
