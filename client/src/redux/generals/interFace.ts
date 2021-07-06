export interface IsLoadingState {
  isloading: boolean
  alert: any
}
export type Alert = { type: string; payload: any }
export type Isloading = { type: string; payload: boolean }
export type ActionGenerals = Alert | Isloading
