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

export const autoCreateKey = () => {
  return async (dispatch: Dispatch<IClearForm>) => {
    try {
      const storage = getStorage()
      const secretKey = JSON.parse(localStorage.getItem("secret_key") as any)
      if (secretKey) {
        return { secretKey }
      } else {
        const userId = storage.data.userId
        const options: any = {
          url: "/api/auto/create/key",
          method: "POST",
          body: userId,
          file: null,
          token: storage.data.token,
          type: null,
        }
        const { data } = await dispatch(useHttp(options))
        if (data.publicK) {
          const key = new NodeRSA({ b: 1024 })
          const public_key = key.exportKey("public")
          const private_key = key.exportKey("private")
          const publicK = new NodeRSA(public_key)
          const privateK = new NodeRSA(private_key)

          localStorage.setItem(
            "secret_key",
            JSON.stringify({ publicK, privateK })
          )
          const secretKey = { publicK, privateK }

          return { secretKey }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}
