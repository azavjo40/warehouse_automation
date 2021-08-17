import { Dispatch } from "redux"
import { ITypesFormRegister, ITypesFormLogin } from "../../interface/auth"
import { useHttp } from "../hooks/useHttp"
import { getStorage, setStorage } from "../../utils/storage"
import { IS_AUTH_USER, USERS_WORLING } from "./types"
import { LOCALSTORAGENAME, SECRETCRYPTOKEY } from "../../constants"
import { autoCreateCryptoKey } from "../generals/generalAcsions"
import { encryption, decryption } from "../../utils/index"

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
      if (storage) {
        if (storage.token) dispatch(authUser(true) as any)
        else dispatch(authUser(false) as any)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const autoSavStorage = (data: any) => {
  return async (dispatch: Dispatch) => {
    if (data.data) setStorage(data.data)
    dispatch(autoLogin() as any)
  }
}

export function authRegister(form: ITypesFormRegister) {
  return async (dispatch: Dispatch) => {
    try {
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      const dataForm = { form: dataEcrypt, userId: keyDecryptEcrypte.userId }
      const options: any = {
        url: "/api/auth/register",
        method: "POST",
        body: dataForm,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      const dataDecrypt = await decryption(
        data.data,
        keyDecryptEcrypte.privateKey
      )
      dispatch(autoSavStorage({ data: dataDecrypt.data }) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form: ITypesFormLogin) {
  return async (dispatch: Dispatch) => {
    try {
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(form, keyDecryptEcrypte.publicKey)
      const dataForm = { form: dataEcrypt, userId: keyDecryptEcrypte.userId }
      const options: any = {
        url: "/api/auth/login",
        method: "POST",
        body: dataForm,
        file: null,
        token: null,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      const dataDecrypt = await decryption(data, keyDecryptEcrypte.privateKey)
      dispatch(autoSavStorage({ data: dataDecrypt }) as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export function logout() {
  return async (dispatch: Dispatch) => {
    dispatch(authUser(false) as any)
    localStorage.removeItem(LOCALSTORAGENAME)
    localStorage.removeItem(SECRETCRYPTOKEY)
    dispatch(autoLogin() as any)
  }
}

export const usersWorking = () => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataForm = { userId: storage.userId }
      const options: any = {
        url: "/api/auth/users/working",
        method: "POST",
        body: dataForm,
        file: null,
        token: storage.token,
        type: null,
      }
      const { data } = await dispatch(useHttp(options))
      const dataDecrypt = await decryption(data, keyDecryptEcrypte.privateKey)
      dispatch({ type: USERS_WORLING, payload: dataDecrypt })
    } catch (e) {
      console.log(e)
    }
  }
}

export const userBlockWorker = (_id: string, permissions: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption(
        { _id, permissions },
        keyDecryptEcrypte.publicKey
      )
      const dataForm = { form: dataEcrypt, userId: storage.userId }
      const options: any = {
        url: "/api/auth/user/change/working",
        method: "POST",
        body: dataForm,
        file: null,
        token: storage.token,
        type: null,
      }
      await dispatch(useHttp(options))
      dispatch(usersWorking() as any)
    } catch (e) {
      console.log(e)
    }
  }
}

export const userDeleteWorker = (_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const storage: any = await getStorage()
      const keyDecryptEcrypte = await dispatch(autoCreateCryptoKey() as any)
      const dataEcrypt = encryption({ _id }, keyDecryptEcrypte.publicKey)
      const dataForm = { form: dataEcrypt, userId: storage.userId }
      const options: any = {
        url: "/api/auth/user/delete/working",
        method: "POST",
        body: dataForm,
        file: null,
        token: storage.token,
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
      if (storage) {
        socket.emit("refresh/token", { userId: storage.userId })
        socket.on(`${storage.userId}`, async ({ data }: any) => {
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
