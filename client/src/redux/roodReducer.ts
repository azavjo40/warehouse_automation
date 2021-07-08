//@ts-check
import { combineReducers } from "redux"
import { generalReducer, authReducer } from "./index"
export const roodreducer = combineReducers({
  generals: generalReducer,
  auth: authReducer,
})
