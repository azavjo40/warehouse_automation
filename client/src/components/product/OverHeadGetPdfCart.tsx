import React from "react"
export const OverHeadGetPdfCart: React.FC<any> = ({ getPdf }) => {
  return (
    <>
      {getPdf && (
        <>
          {getPdf &&
            getPdf.map((item: any, index: any) => {
              return (
                <ul className='list-ul' key={index}>
                  <li className='list-li'>Type: {item.type_commodity}</li>
                  <li className='list-li'>Name: {item.product_name}</li>
                  <li className='list-li'>Quantity: {item.quantity}</li>
                </ul>
              )
            })}
          <div className='singature-cont'>
            <span className='singature-list'>
              Recipient = {getPdf && getPdf[0].accepted_product}
            </span>
            <span className='singature-list'>
              Delivery = {`Driver: ${getPdf && getPdf[0].driver}`}
            </span>
          </div>
        </>
      )}
    </>
  )
}
