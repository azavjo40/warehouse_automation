export interface ITypesFormRegister {
  name: string
  last_name: string
  email: string
  password: string
  position: string
}

export interface ITypesFormLogin {
  email: string
  password: string
}

export interface IFormPropsLogin {
  postLogin: (form: ITypesFormLogin) => void
}
export interface IFormPropsRegister {
  postRegister: (form: ITypesFormRegister) => void
}

export interface IInitialStateAuth {
  isAuthUser: boolean
  users: Array<[]>
}

export interface IAcsionAuth {
  type: string
  payload: boolean
}

export interface IPropsUserWorking {
  item: any
  deleteWorker: (_id: string) => void
  blockWorker: (_id: string, permissions: boolean) => void
}

export interface IAnswerServer {
  date: string
  email: string
  last_name: string
  name: string
  permissions: string
  position: string
  token: string
  userId: string
}

export interface IUser {
  name: string
  last_name: string
  email: string
  password: string
  position: string
  permissions: string
  save: () => void
  date: string
  _id: string
}
