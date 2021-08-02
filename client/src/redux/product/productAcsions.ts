import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import { Dispatch } from "redux"
import { autoCreateCryptoKey } from "../generals/generalAcsions"
import { getStorage } from "../../utils/storage"
import { useHttp } from "../hooks/useHttp"
import { encryption } from "../../utils/index"

const storage = getStorage()
const options: any = {
  url: null,
  method: null,
  body: null,
  file: null,
  token: null,
  type: null,
}

export const postReceipt = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      options.token = storage.token
      options.body = { userId, dataEcrypt }
      options.url = "/api/product/receipt"
      options.method = "POST"
      dispatch(useHttp(options) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const postDispatch = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<IActionProduct>) => {
    try {
      const userId = storage.userId
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      options.token = storage.token
      options.body = { userId, dataEcrypt }
      options.url = "/api/product/dispatch"
      options.method = "POST"
      dispatch(useHttp(options) as any)
    } catch (e) {
      console.log(e)
    }
  }
}
