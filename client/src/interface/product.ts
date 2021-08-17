export interface ITypesFormProduct {
  purveyor: string
  driver: string
  product_name: string
  type_commodity: string
  quantity: string
  product_namber: string
  accepted_product?: string
  sender_product?: string
  userId: string
}

export interface IFormPropsDispatchProduct {
  dispatchHandler: (form: ITypesFormProduct) => void
  storage: any
}

export interface IFormPropsReceiptProduct {
  receiptHandler: (form: ITypesFormProduct) => void
  storage: any
}

export interface productState {
  product: any
  pdf: any
}

export type IClearForm = { type: string; payload: Array<[]> }
export type IActionProduct = IClearForm
