export interface TypesForm {
  name: string
  email: string
  password: string
  position: string
}
export interface FormProps {
  postRegister: (form: TypesForm) => void
}
