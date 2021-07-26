import { ITypesFormProduct, IActionProduct } from "../../interface/product"
import {} from "./types"
import { Dispatch } from "redux"
export const postReceipt = (form: ITypesFormProduct) => {
  return (dispatch: Dispatch<IActionProduct>) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}

export const postDispatch = (form: ITypesFormProduct) => {
  return (dispatch: Dispatch<IActionProduct>) => {
    try {
      console.log(form)
    } catch (e) {
      console.log(e)
    }
  }
}
