import { ClearForm, showAlert, showLoader } from "../generals/generalAcsions"
import { Dispatch } from "redux"

export function useHttp(options: any): any {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(showLoader(true))
      const requestOptions: any = {
        method: options.method,
        headers: { Authorization: options.token },
      }
      if (
        (options.method === "POST" && options.body) ||
        (options.method === "PATCH" && options.body)
      ) {
        requestOptions.body = JSON.stringify(options.body)
        requestOptions.headers = {
          "Content-Type": "application/json",
          Authorization: options.token,
        }
      }

      if (
        (options.file && options.method === "POST") ||
        (options.file && options.method === "PATCH")
      ) {
        requestOptions.body = options.file
      }

      const response = await fetch(options.url, requestOptions)

      const data = await response.json()

      dispatch(ClearForm(response.ok))

      if (options.type && data) {
        dispatch({ type: options.type, payload: data })
      }

      if (data.message) {
        dispatch(showAlert(data.message))
      }

      dispatch(showLoader(false))
      return { data }
    } catch (e) {
      console.log(e)
    }
  }
}
