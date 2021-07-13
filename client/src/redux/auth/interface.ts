export interface InitialStateAuth {
  isAuthUser: boolean
  users: Array<[]>
}

export interface AcsionAuth {
  type: string
  payload: boolean
}
