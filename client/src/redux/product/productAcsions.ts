import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import {} from "./types"
import { Dispatch } from "redux"
import { autoCreateCryptoKey } from "../generals/generalAcsions"
import NodeRSA from "node-rsa"
import { getStorage } from "../../utils/storage"
import { useHttp } from "../hooks/useHttp"

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
      const userId = storage.data.userId

      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)

      const encrypt = new NodeRSA(keyDecryptEcrypte.publicKey)

      const dataToString: string = JSON.stringify(form)

      const dataEcrypte = encrypt.encrypt(dataToString, "base64")
      options.token = storage.data.token
      options.body = { userId, dataEcrypte }
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
      const userId = storage.data.userId

      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)

      const encrypt = new NodeRSA(keyDecryptEcrypte.publicKey)

      const dataToString: string = JSON.stringify(form)

      const dataEcrypte = encrypt.encrypt(dataToString, "base64")
      options.token = storage.data.token
      options.body = { userId, dataEcrypte }
      options.url = "/api/product/dispatch"
      options.method = "POST"
      dispatch(useHttp(options) as any)
    } catch (e) {
      console.log(e)
    }
  }
}
