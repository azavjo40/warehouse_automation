import { IS_LOADING, SHOW_ALERT } from "./types"
import { IIsLoadingState, IActionGenerals } from "../../interface/generals"
const initialState = {
  isloading: false,
  alert: "",
}
export const generalReducer = (
  state: IIsLoadingState = initialState,
  actoin: IActionGenerals
) => {
  switch (actoin.type) {
    case IS_LOADING:
      return { ...state, isloading: actoin.payload }
    case SHOW_ALERT:
      return { ...state, alert: actoin.payload }
    default:
      return state
  }
}
