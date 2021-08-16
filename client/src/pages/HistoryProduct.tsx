import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { historyProduct } from "../redux/product/productAcsions"
import { CartHistoryGet, CartHistoryPost, Loading } from "../components/index"
export const HistoryProduct: React.FC = () => {
  const [show, setShow] = useState(false)
  const product = useSelector<any>(state => state.product.product)
  const dispatch = useDispatch()
  useEffect(() => dispatch(historyProduct() as any), [dispatch])
  return (
    <div className='container '>
      {product ? (
        <>
          <div className='collection'>
            <p className='collection-item'>
              <span
                onClick={() => setShow(false)}
                className='new badge red cursor'
              >
                post History
              </span>
              {show ? "Get History" : "post History"}
              <span
                onClick={() => setShow(true)}
                className='new badge blue cursor'
              >
                Get History
              </span>
            </p>
          </div>
          {show ? (
            <CartHistoryGet product={product} />
          ) : (
            <CartHistoryPost product={product} />
          )}
        </>
      ) : (
        <Loading text={"Please wait searching..."} />
      )}
    </div>
  )
}
