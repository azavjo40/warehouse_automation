import { IS_LOADING } from "./types"
import { IsLoadingState, ActionGenerals } from "./interFace"
const initialState = {
  isloading: false,
}
export const generalReducer = (
  state: IsLoadingState = initialState,
  actoin: ActionGenerals
) => {
  switch (actoin.type) {
    case IS_LOADING:
      return { ...state, isloading: actoin.payload }
    default:
      return state
  }
}
