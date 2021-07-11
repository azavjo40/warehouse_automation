import { Dispatch } from "redux"
import {
  TypesFormRegister,
  TypesFormLogin,
} from ".././/..//components/auth/interface"
import { useHttp } from "../hooks/useHttp"
import { getStorage, setStorage } from "../generals/generalAcsions"
import { IS_AUTH_USER } from "./types"
import { LOCALSTORAGENAME } from "../../constants"

export const authUser = (isAuthUser: boolean) => {
  return (dispatch: Dispatch): void => {
    try {
      dispatch({ type: IS_AUTH_USER, payload: isAuthUser })
    } catch (e) {
      console.log(e)
    }
  }
}

export function autoLogin() {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      if (storage.token) dispatch(authUser(true) as any)
      else dispatch(authUser(false) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authRegister(form: TypesFormRegister) {
  return async (dispatch: Dispatch) => {
    try {
      const options = {
        url: "/api/auth/register",
        method: "POST",
        body: form,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      await setStorage(data)
      await dispatch(autoLogin() as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form: TypesFormLogin) {
  return async (dispatch: Dispatch) => {
    try {
      const options = {
        url: "/api/auth/login",
        method: "POST",
        body: form,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      await setStorage(data)
      await dispatch(autoLogin() as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function logout() {
  return async (dispatch: Dispatch) => {
    dispatch(authUser(false) as any)
    localStorage.removeItem(LOCALSTORAGENAME)
    dispatch(autoLogin() as any)
  }
}
