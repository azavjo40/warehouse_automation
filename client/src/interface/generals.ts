export interface IGeneralsState {
  isloading: boolean
  alert: string
  clearForm: boolean
}

export type IAlert = { type: string; payload: any }
export type IIsloading = { type: string; payload: boolean }
export type IClearForm = { type: string; payload: boolean }
export type IActionGenerals = IAlert | IIsloading | IClearForm
