import { IActionGenerals, IClearForm } from "../../interface/generals"
import { IS_LOADING, SHOW_ALERT, CLEAR_FORM } from "./types"
import { Dispatch } from "redux"
import { useHttp } from "../hooks/useHttp"
import { getStorage } from "../../utils/storage"
import { SECRETCRYPTOKEY } from "../../constants/index"
import NodeRSA from "node-rsa"
const storage = getStorage()
const options: any = {
  url: "/api/auto/create/key",
  method: "POST",
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
      let userId
      if (storage) {
        userId = storage.data.userId
        options.token = storage.data.token
      }

      const timeId: string = JSON.stringify(Date.now())

      const storageKey: any = JSON.parse(
        localStorage.getItem(SECRETCRYPTOKEY) as any
      )

      if (storageKey) return storageKey

      userId ? (options.body = { userId }) : (options.body = { timeId })
      const { data } = await dispatch(useHttp(options))
      const dataFirst = data

      if (dataFirst.publicKey) {
        const newKey = new NodeRSA({ b: 1024 })

        const publicKey = newKey.exportKey("public")

        const privateKey = newKey.exportKey("private")

        const encrypt = new NodeRSA(dataFirst.publicKey)

        const publicKeyToString: string = JSON.stringify(publicKey)

        const clientKey = encrypt.encrypt(publicKeyToString, "base64")

        options.body = { userId, timeId: !userId && timeId, clientKey }

        const { data } = await dispatch(useHttp(options))

        const decrypte = new NodeRSA(privateKey)

        const decryptData = decrypte.decrypt(data, "utf8")

        localStorage.setItem(SECRETCRYPTOKEY, decryptData)

        const decryptDataToSting: string = JSON.parse(decryptData)

        if (!userId) {
          setTimeout(() => localStorage.removeItem(SECRETCRYPTOKEY), 9000)
        }

        return decryptDataToSting
      }
    } catch (e) {
      console.log(e)
    }
  }
}
