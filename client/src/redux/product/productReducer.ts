import { ALL_PRODUCT } from "./types"
import { IActionProduct, productState } from "../../interface/product"
const initialState: productState = {
  product: null,
}
export const productReducer = (
  state: productState = initialState,
  actoin: IActionProduct
) => {
  switch (actoin.type) {
    case ALL_PRODUCT:
      return { ...state, product: actoin.payload }
    default:
      return state
  }
}
