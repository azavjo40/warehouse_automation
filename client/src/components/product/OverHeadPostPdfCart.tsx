import React from "react"
export const OverHeadPostPdfCart: React.FC<any> = ({ postPdf }) => {
  return (
    <>
      {postPdf &&
        postPdf.map((item: any, index: any) => {
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
          Sender = {postPdf[0].sender_product}
        </span>
        <span className='singature-list'>
          Recipient = {`Driver: ${postPdf[0].driver}`}
        </span>
      </div>
    </>
  )
}
