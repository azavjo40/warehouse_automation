import { LOCALSTORAGENAME } from "../constants/index"
export const getStorage = (): any => {
  const storage: any = JSON.parse(localStorage.getItem(LOCALSTORAGENAME) as any)
  return storage ? storage : "storage"
}
export const setStorage = async (items: any) => {
  try {
    localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(items))
  } catch (e) {
    console.log(e)
  }
}
