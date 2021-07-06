import { IS_AUTH_USER } from "./types"
import { InitialStateAuth, AcsionAuth } from "./interface"
const initialState = {
  isAuthUser: false,
}

export const authReducer = (
  state: InitialStateAuth = initialState,
  actoin: AcsionAuth
) => {
  switch (actoin.type) {
    case IS_AUTH_USER:
      return { ...state, isAuthUser: actoin.payload }
    default:
      return state
  }
}
