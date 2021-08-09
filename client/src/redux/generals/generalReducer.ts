import { IS_LOADING, SHOW_ALERT, CLEAR_FORM } from "./types"
import { IGeneralsState, IActionGenerals } from "../../interface/generals"
const initialState: IGeneralsState = {
  isloading: false,
  alert: "",
  clearForm: false,
}
export const generalReducer = (
  state: IGeneralsState = initialState,
  actoin: IActionGenerals
) => {
  switch (actoin.type) {
    case IS_LOADING:
      return { ...state, isloading: actoin.payload }
    case SHOW_ALERT:
      return { ...state, alert: actoin.payload }
    case CLEAR_FORM:
      return { ...state, clearForm: actoin.payload }
    default:
      return state
  }
}
