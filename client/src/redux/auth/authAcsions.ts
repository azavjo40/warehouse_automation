import { Dispatch } from "redux"
import {
  TypesFormRegister,
  TypesFormLogin,
} from ".././/..//components/auth/interface"
import { useHttp } from "../hooks/useHttp"

export function authRegister(form: TypesFormRegister) {
  return async (dispach: Dispatch) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form: TypesFormLogin) {
  return async (dispach: Dispatch) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}
