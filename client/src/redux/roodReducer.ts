//@ts-check
import { combineReducers } from "redux"
import { generalReducer, authReducer, productReducer } from "./index"
export const roodreducer = combineReducers({
  generals: generalReducer,
  auth: authReducer,
  product: productReducer,
})
