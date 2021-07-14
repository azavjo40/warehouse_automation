import { ActionGenerals } from "./interFace"
import { IS_LOADING, SHOW_ALERT } from "./types"
import { Dispatch } from "redux"
import { LOCALSTORAGENAME } from "../../constants/index"
export const setStorage = async (items: any) => {
  try {
    localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(items))
  } catch (e) {
    console.log(e)
  }
}

export const getStorage = async () => {
  let storage: any = await JSON.parse(
    localStorage.getItem(LOCALSTORAGENAME) as any
  )
  if (storage) return storage
}

export const showLoader = (bool: boolean) => {
  return (dispatch: Dispatch<ActionGenerals>): void => {
    try {
      dispatch({ type: IS_LOADING, payload: bool })
    } catch (e) {
      console.log(e)
    }
  }
}

export function showAlert(text: string) {
  return (dispatch: Dispatch<ActionGenerals>) => {
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
