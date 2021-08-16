import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import { Dispatch } from "redux"
import { autoCreateCryptoKey } from "../generals/generalAcsions"
import { getStorage } from "../../utils/storage"
import { useHttp } from "../hooks/useHttp"
import { encryption, decryption } from "../../utils/index"
import { ALL_PRODUCT } from "./types"
import { DISPATCHPDF, RECEIPTPDF } from "../../constants"
const options: any = {
  url: null,
  method: null,
  body: null,
  file: null,
  token: null,
  type: null,
}

export const overHeadPdfReceipt = (form: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const receiptLocal = JSON.parse(localStorage.getItem(RECEIPTPDF) as any)
      if (receiptLocal) {
        const dataStorage = [...receiptLocal, form]
        localStorage.setItem(RECEIPTPDF, JSON.stringify(dataStorage))
      } else {
        localStorage.setItem(RECEIPTPDF, JSON.stringify([form]))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const overHeadPdfDispatch = (form: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const dispatchLocal = JSON.parse(localStorage.getItem(DISPATCHPDF) as any)
      if (dispatchLocal) {
        const dataStorage = [...dispatchLocal, form]
        localStorage.setItem(DISPATCHPDF, JSON.stringify(dataStorage))
      } else {
        localStorage.setItem(DISPATCHPDF, JSON.stringify([form]))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const postReceipt = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const storage = getStorage()
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      options.token = storage.token
      options.body = { userId, FormData: dataEcrypt }
      options.url = "/api/product/receipt"
      options.method = "POST"
      const { data } = await dispatch(useHttp(options) as any)
      if (data.good) dispatch(overHeadPdfReceipt(form) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const postDispatch = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<IActionProduct>) => {
    try {
      const storage = getStorage()
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      options.token = storage.token
      options.body = { userId, FormData: dataEcrypt }
      options.url = "/api/product/dispatch"
      options.method = "POST"
      const { data } = await dispatch(useHttp(options) as any)
      if (data.good) dispatch(overHeadPdfDispatch(form) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const historyProduct = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const storage = getStorage()
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      options.token = storage.token
      options.body = { userId }
      options.url = "/api/product/history"
      options.method = "POST"
      const { data } = await dispatch(useHttp(options) as any)
      const dataDecrypt = decryption(data, keyDecryptEcrypte.privateKey)
      dispatch({ type: ALL_PRODUCT, payload: dataDecrypt })
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteHistoryProduct = (_id: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const storage = getStorage()
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(_id, keyDecryptEcrypte.publicKey)
      options.token = storage.token
      options.body = { userId, FormData: dataEcrypt }
      options.url = "/api/delete/product/history"
      options.method = "POST"
      await dispatch(useHttp(options) as any)
      dispatch(historyProduct())
    } catch (e) {
      console.log(e)
    }
  }
}
