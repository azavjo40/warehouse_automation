import React, { useState } from "react"
export const CarthistoryProduct: React.FC<any> = ({ product }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className='collection'>
        <p className='collection-item'>
          <span onClick={() => setShow(false)} className='new badge red cursor'>
            post History
          </span>
          {show ? "Get History" : "post History"}
          <span onClick={() => setShow(true)} className='new badge blue cursor'>
            Get History
          </span>
        </p>
      </div>
      {show ? (
        <div className='turnTheQueue'>
          {product &&
            product.receipt.map((item: any) => {
              return (
                <ul className='collection ' key={item._id}>
                  <li className='collection-item'>
                    {`${item.accepted_product}
                    driver: ${item.driver} purveyor: ${item.purveyor} type:  ${
                      item.type_commodity
                    } product_name: ${item.product_name} items:  ${
                      item.quantity
                    } 
                    date: ${new Date(item.date).toLocaleDateString()}`}
                  </li>
                </ul>
              )
            })}
        </div>
      ) : (
        <div className='turnTheQueue'>
          {product &&
            product.sendProduct.map((item: any) => {
              return (
                <ul className='collection ' key={item._id}>
                  <li className='collection-item'>
                    {`${item.sender_product}
                    driver: ${item.driver} purveyor: ${item.purveyor} type:  ${
                      item.type_commodity
                    } product_name: ${item.product_name} items:  ${
                      item.quantity
                    } 
                    date: ${new Date(item.date).toLocaleDateString()}`}
                  </li>
                </ul>
              )
            })}
        </div>
      )}
    </>
  )
}
