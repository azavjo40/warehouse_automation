import { IActionGenerals, IClearForm } from "../../interface/generals"
import { IS_LOADING, SHOW_ALERT, CLEAR_FORM } from "./types"
import { Dispatch } from "redux"
import { useHttp } from "../hooks/useHttp"
import { getStorage } from "../../utils/storage"
import NodeRSA from "node-rsa"

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

export function autoCreateKey() {
  return async (dispatch: Dispatch<IClearForm>) => {
    try {
      const storage = getStorage()
      const userId = storage.data.userId
      const options: any = {
        url: "/api/auto/create/key",
        method: "POST",
        body: { userId },
        file: null,
        token: storage.data.token,
        type: null,
      }
      await dispatch(useHttp(options))

      const storageKey = JSON.parse(localStorage.getItem("secret_key") as any)
      if (storageKey) {
        return {
          publicKey: storageKey.publicKey,
          privateKey: storageKey.privateKey,
        }
      } else {
        const { data } = await dispatch(useHttp(options))
        if (data.publicKey) {
          const newKey = new NodeRSA({ b: 1024 })
          const publicKey = newKey.exportKey("public")
          const privateKey = newKey.exportKey("private")
          const decryptKey = new NodeRSA(data.publicKey)
          const keyString: string = JSON.stringify({ publicKey, privateKey })
          localStorage.setItem("secret_key", keyString)
          const clientKey = decryptKey.encrypt(keyString, "base64")
          options.body = { userId, clientKey: clientKey }
          await dispatch(useHttp(options))
          return { publicKey, privateKey }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}
