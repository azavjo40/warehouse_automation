export interface TypesFormRegister {
  name: string
  last_name: string
  email: string
  password: string
  position: string
}

export interface TypesFormLogin {
  email: string
  password: string
}

export interface FormPropsLogin {
  postLogin: (form: TypesFormLogin) => void
}

export interface FormPropsRegister {
  postRegister: (form: TypesFormRegister) => void
}
