import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import {} from "./types"
import { Dispatch } from "redux"
import { autoCreateCryptoKey } from "../generals/generalAcsions"
import NodeRSA from "node-rsa"
import { getStorage } from "../../utils/storage"
import { useHttp } from "../hooks/useHttp"

const storage = getStorage()
const userId = storage.data.userId
const options: any = {
  url: null,
  method: null,
  body: null,
  file: null,
  token: storage.data.token,
  type: null,
}

export const postReceipt = (form: ITypesFormProduct) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)

      const ecrypteKey = new NodeRSA(keyDecryptEcrypte.publicKey)

      const formToString: string = JSON.stringify(form)

      const formEcrypte = ecrypteKey.encrypt(formToString, "base64")

      options.body = { userId, formEcrypte }
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
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)

      const ecrypteKey = new NodeRSA(keyDecryptEcrypte.publicKey)

      const formToString: string = JSON.stringify(form)

      const formEcrypte = ecrypteKey.encrypt(formToString, "base64")

      options.body = { userId, formEcrypte }
      options.url = "/api/product/dispatch"
      options.method = "POST"
      dispatch(useHttp(options) as any)
    } catch (e) {
      console.log(e)
    }
  }
}
