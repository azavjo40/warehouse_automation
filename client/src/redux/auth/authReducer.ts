import { IS_AUTH_USER, USERS_WORLING } from "./types"
import { InitialStateAuth, AcsionAuth } from "./interface"
const initialState = {
  isAuthUser: false,
  users: [],
}

export const authReducer = (
  state: InitialStateAuth = initialState,
  actoin: AcsionAuth
) => {
  switch (actoin.type) {
    case IS_AUTH_USER:
      return { ...state, isAuthUser: actoin.payload }
    case USERS_WORLING:
      return { ...state, users: actoin.payload }
    default:
      return state
  }
}
