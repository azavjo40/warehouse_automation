import { ActionGenerals } from "./interFace"
import { IS_LOADING, SHOW_ALERT } from "./types"
import { Dispatch } from "redux"

export const showLoader = (bool: boolean) => {
  return (dispatch: Dispatch<ActionGenerals>): void => {
    dispatch({ type: IS_LOADING, payload: bool })
  }
}

export function showAlert(text: string) {
  return (dispatch: Dispatch<ActionGenerals>) => {
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
  }
}
