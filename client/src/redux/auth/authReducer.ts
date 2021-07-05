import { IS_AUTH_USER } from "./types"
import { initialStateAuth, AcsionAuth } from "./interface"
const initialState = {
  isAuthUser: false,
}

export const authReducer = (
  state: initialStateAuth = initialState,
  actoin: AcsionAuth
) => {
  switch (actoin.type) {
    case IS_AUTH_USER:
      return { ...state, isAuthUser: actoin.payload }
    default:
      return state
  }
}
