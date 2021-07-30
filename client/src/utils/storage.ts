import { LOCALSTORAGENAME } from "../constants/index"
import Cookies from "js-cookie"
export const getStorage = (): any => {
  const storage: any = Cookies.get(LOCALSTORAGENAME)
  return storage ? JSON.parse(storage) : null
}
export const setStorage = async (items: any) => {
  try {
    Cookies.set(LOCALSTORAGENAME, JSON.stringify(items), { expires: 1 })
  } catch (e) {
    console.log(e)
  }
}
