import { IS_AUTH_USER, USERS_WORLING } from "./types"
import { IAuthState, IAcsionAuth } from "../../interface/auth"
const initialState: IAuthState = {
  isAuthUser: false,
  users: [],
}

export const authReducer = (
  state: IAuthState = initialState,
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
