export interface IIsLoadingState {
  isloading: boolean
  alert: any
}
export type IAlert = { type: string; payload: any }
export type IIsloading = { type: string; payload: boolean }
export type IActionGenerals = IAlert | IIsloading
