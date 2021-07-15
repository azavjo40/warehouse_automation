import { IS_AUTH_USER, USERS_WORLING } from "./types"
import { IInitialStateAuth, IAcsionAuth } from "../../interface/auth"
const initialState = {
  isAuthUser: false,
  users: [],
}

export const authReducer = (
  state: IInitialStateAuth = initialState,
  actoin: IAcsionAuth
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
