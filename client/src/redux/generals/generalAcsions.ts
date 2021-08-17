import { IActionGenerals, IClearForm } from "../../interface/generals"
import { IS_LOADING, SHOW_ALERT, CLEAR_FORM } from "./types"
import { Dispatch } from "redux"
import { useHttp } from "../hooks/useHttp"
import { getStorage } from "../../utils/storage"
import { SECRETCRYPTOKEY } from "../../constants/index"
import { decryption } from "../../utils/index"
import NodeRSA from "node-rsa"

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
      const storage = getStorage()
      const userId = storage ? storage.userId : null
      storage && (options.token = storage.token)
      const timeId = JSON.stringify(Date.now())
      const storageSecret: any = localStorage.getItem(SECRETCRYPTOKEY)

      if (storageSecret) return JSON.parse(storageSecret)

      const newKey = new NodeRSA({ b: 1024 })
      const publicKey = newKey.exportKey("public")
      const privateKey = newKey.exportKey("private")
      options.url = "/api/auto/create/key"
      options.method = "POST"
      options.body = { userId, timeId: !userId && timeId, clientKey: publicKey }
      const { data } = await dispatch(useHttp(options))
      const dataDecrypt = await decryption(data, privateKey)
      localStorage.setItem(SECRETCRYPTOKEY, JSON.stringify(dataDecrypt))

      if (!userId) {
        setTimeout(() => localStorage.removeItem(SECRETCRYPTOKEY), 8000)
      }
      return dataDecrypt
    } catch (e) {
      console.log(e)
    }
  }
}
