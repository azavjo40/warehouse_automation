import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import {} from "./types"
import { Dispatch } from "redux"
import { autoCreateKey } from "../generals/generalAcsions"
// import { getStorage } from "../../utils/storage"
// import { useHttp } from "../hooks/useHttp"

export const postReceipt = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const key = await dispatch(autoCreateKey() as any)
      console.log(key)
    } catch (e) {
      console.log(e)
    }
  }
}

export const postDispatch = (form: ITypesFormProduct) => {
  return (dispatch: Dispatch<IActionProduct>) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}
