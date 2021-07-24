export interface ILogin {
  login: string
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

export interface IUbdateUserBlockWorker {
  permissions: string
}
