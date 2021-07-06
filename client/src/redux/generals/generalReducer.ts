import { IS_LOADING, SHOW_ALERT } from "./types"
import { IsLoadingState, ActionGenerals } from "./interFace"
const initialState = {
  isloading: false,
  alert: false,
}
export const generalReducer = (
  state: IsLoadingState = initialState,
  actoin: ActionGenerals
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
