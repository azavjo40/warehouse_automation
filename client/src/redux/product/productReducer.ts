import { ALL_PRODUCT, PRODUCTS_PDF } from "./types"
import { IActionProduct, productState } from "../../interface/product"
const initialState: productState = {
  product: null,
  pdf: null,
}
export const productReducer = (
  state: productState = initialState,
  actoin: IActionProduct
) => {
  switch (actoin.type) {
    case ALL_PRODUCT:
      return { ...state, product: actoin.payload }
    case PRODUCTS_PDF:
      return { ...state, pdf: actoin.payload }
    default:
      return state
  }
}
