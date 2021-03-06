import React, { useState, useRef, useEffect } from "react"
import { OverHeadGetPdfCart, OverHeadPostPdfCart } from "../components/index"
import { RECEIPTPDF, DISPATCHPDF } from "../constants"
import ReactToPrint from "react-to-print"
import { useDispatch, useSelector } from "react-redux"
import { autoOverHeadPdf } from "../redux/product/productAcsions"

export const OverHeadPdf: React.FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  useEffect(() => dispatch(autoOverHeadPdf() as any), [dispatch])
  const productPdf = useSelector<any>(state => state.product.pdf)
  const componentRef = useRef() as any

  const removepdfHost = () => {
    const confirm: boolean = window.confirm("Did you remove pdf ?")
    const result = show ? RECEIPTPDF : DISPATCHPDF
    confirm && localStorage.removeItem(result)
    dispatch(autoOverHeadPdf() as any)
  }
  return (
    <>
      <div className='container ' ref={componentRef}>
        <div className='collection'>
          <p className='collection-item'>
            <span
              onClick={() => setShow(false)}
              className='new badge red cursor'
            >
              Shipped products
            </span>
            {show ? "  Received products" : "Shipped products"}
            <span
              onClick={() => setShow(true)}
              className='new badge blue cursor'
            >
              Received products
            </span>
          </p>
        </div>
        <div className='pdf-cont'>
          <div className='pdf-list'>
            <span>Warszawa </span>
            <span>{`Date: ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}`}</span>
            {show ? (
              <OverHeadGetPdfCart getPdf={productPdf} />
            ) : (
              <OverHeadPostPdfCart postPdf={productPdf} />
            )}
          </div>
        </div>
      </div>
      <div className='container '>
        <ReactToPrint
          trigger={() => (
            <p className='waves-effect waves-light btn-small right'>
              <i className='material-icons left'>cloud</i>Create Pdf
            </p>
          )}
          content={() => componentRef.current}
        />

        <p
          className='waves-effect waves-light btn-small left'
          onClick={removepdfHost}
        >
          <i className='material-icons left'>cloud</i>Clear Pdf
        </p>
      </div>
    </>
  )
}
