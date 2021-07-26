import { Dispatch } from "redux"
import { ITypesFormRegister, ITypesFormLogin } from "../../interface/auth"
import { useHttp } from "../hooks/useHttp"
import { getStorage, setStorage } from "../../utils/storage"
import { IS_AUTH_USER, USERS_WORLING } from "./types"
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
      const storage: any = getStorage()
      if (storage.data) {
        if (storage.data.token) dispatch(authUser(true) as any)
        else dispatch(authUser(false) as any)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const autoSavStorage = (data: any) => {
  return async (dispatch: Dispatch) => {
    setStorage(data)
    dispatch(autoLogin() as any)
  }
}

export function authRegister(form: ITypesFormRegister) {
  return async (dispatch: Dispatch) => {
    try {
      const options: any = {
        url: "/api/auth/register",
        method: "POST",
        body: form,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      dispatch(autoSavStorage(data) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form: ITypesFormLogin) {
  return async (dispatch: Dispatch) => {
    try {
      const options: any = {
        url: "/api/auth/login",
        method: "POST",
        body: form,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      dispatch(autoSavStorage(data) as any)
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

export const usersWorking = () => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const options: any = {
        url: "/api/auth/users/working",
        method: "GET",
        body: null,
        file: null,
        token: storage.data.token,
        type: USERS_WORLING,
      }
      await dispatch(useHttp(options))
    } catch (e) {
      console.log(e)
    }
  }
}

export const userBlockWorker = (
  _id: string,
  permissions: boolean,
  userId: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const options: any = {
        url: "/api/auth/user/change/working",
        method: "POST",
        body: { _id, permissions, userId },
        file: null,
        token: storage.data.token,
        type: null,
      }
      await dispatch(useHttp(options))
      dispatch(usersWorking() as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const userDeleteWorker = (_id: string, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const options: any = {
        url: "/api/auth/user/delete/working",
        method: "POST",
        body: { _id, userId },
        file: null,
        token: storage.data.token,
        type: null,
      }
      await dispatch(useHttp(options))
      dispatch(usersWorking() as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const refresh_token = (socket: any) => {
  return async (dispatch: Dispatch) => {
    const storage: any = await getStorage()
    try {
      if (storage.data) {
        socket.emit("refresh/token", { userId: storage.data.userId })
        socket.on(`${storage.data.userId}`, async ({ data }: any) => {
          if (data) {
            dispatch(autoSavStorage({ data }) as any)
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
