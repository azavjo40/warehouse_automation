import { Dispatch } from "redux"
import {
  TypesFormRegister,
  TypesFormLogin,
} from ".././/..//components/auth/interface"
import { useHttp } from "../hooks/useHttp"

export function authRegister(form: TypesFormRegister) {
  return async (dispatch: Dispatch) => {
    try {
      const options = {
        url: "http://localhost:5000/api/auth/register",
        method: "POST",
        body: form,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form: TypesFormLogin) {
  return async (dispatch: Dispatch) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}
