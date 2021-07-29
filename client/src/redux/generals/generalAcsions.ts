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
  token: storage.data.token,
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
      const userId = storage.data.userId

      const storageKey: any = JSON.parse(
        localStorage.getItem(SECRETCRYPTOKEY) as any
      )

      if (storageKey) {
        return storageKey
      }

      options.body = { userId }
      const { data } = await dispatch(useHttp(options))
      const dataFirst = data

      if (dataFirst.publicKey) {
        const newKey = new NodeRSA({ b: 1024 })

        const publicKey = newKey.exportKey("public")

        const privateKey = newKey.exportKey("private")

        const ecrypteKey = new NodeRSA(dataFirst.publicKey)

        const keySeandToServer: string = JSON.stringify(publicKey)

        const clientKey = ecrypteKey.encrypt(keySeandToServer, "base64")

        options.body = { userId, clientKey }

        const { data } = await dispatch(useHttp(options))

        const decrypteKey = new NodeRSA(privateKey)

        const getData = decrypteKey.decrypt(data, "utf8")

        localStorage.setItem(SECRETCRYPTOKEY, getData)

        const getDataSting: string = JSON.parse(getData)

        return getDataSting
      }
    } catch (e) {
      console.log(e)
    }
  }
}
