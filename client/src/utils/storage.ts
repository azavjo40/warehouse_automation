import { LOCALSTORAGENAME } from "../constants/index"
export const getStorage = () => {
  const storage: any = JSON.parse(localStorage.getItem(LOCALSTORAGENAME) as any)
  return storage ? storage : "storage"
}
