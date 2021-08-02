import { IActionGenerals, IClearForm } from "../../interface/generals"
import { IS_LOADING, SHOW_ALERT, CLEAR_FORM } from "./types"
import { Dispatch } from "redux"
import { useHttp } from "../hooks/useHttp"
import { getStorage } from "../../utils/storage"
import { SECRETCRYPTOKEY } from "../../constants/index"
import { decryption } from "../../utils/index"
import Cookies from "js-cookie"
import NodeRSA from "node-rsa"
const storage = getStorage()
const options: any = {
  url: null,
  method: null,
  body: null,
  file: null,
  token: null,
  type: null,
}

export const showLoader = (bool: boolean) => {
  return (dispatch: Dispatch<IActionGenerals>): void => {
    try {
      dispatch({ type: IS_LOADING, payload: bool })
    } catch (e) {
      console.log(e)
    }
  }
}

export const ClearForm = (bool: boolean) => {
  return (dispatch: Dispatch<IClearForm>): void => {
    try {
      dispatch({ type: CLEAR_FORM, payload: bool })
    } catch (e) {
      console.log(e)
    }
  }
}

export function showAlert(text: string) {
  return (dispatch: Dispatch<IActionGenerals>) => {
    try {
      dispatch({
        type: SHOW_ALERT,
        payload: text,
      })
      setTimeout(() => {
        dispatch({
          type: SHOW_ALERT,
          payload: null,
        })
      }, 3000)
    } catch (e) {
      console.log(e)
    }
  }
}

export function autoCreateCryptoKey() {
  return async (dispatch: Dispatch<IClearForm>) => {
    try {
      const userId = storage ? storage.userId : null
      storage && (options.token = storage.token)
      const timeId = Date.now()
      const cookies: any = Cookies.get(SECRETCRYPTOKEY)

      if (cookies) return JSON.parse(cookies)
      const newKey = new NodeRSA({ b: 1024 })
      const publicKey = newKey.exportKey("public")
      const privateKey = newKey.exportKey("private")
      options.url = "/api/auto/create/key"
      options.method = "POST"
      options.body = { userId, timeId: !userId && timeId, clientKey: publicKey }
      const { data } = await dispatch(useHttp(options))
      const dataDecrypt = await decryption(data, privateKey)
      Cookies.set(SECRETCRYPTOKEY, JSON.stringify(dataDecrypt), { expires: 1 })
      if (!userId) {
        setTimeout(() => Cookies.remove(SECRETCRYPTOKEY), 8000)
      }

      return dataDecrypt
    } catch (e) {
      console.log(e)
    }
  }
}
