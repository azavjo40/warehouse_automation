import { ActionGenerals } from "./interFace"
import { IS_LOADING } from "./types"
import { Dispatch } from "redux"

export const isloading = (bool: boolean) => {
  return (dispatch: Dispatch<ActionGenerals>): void => {
    dispatch({ type: IS_LOADING, payload: bool })
  }
}
