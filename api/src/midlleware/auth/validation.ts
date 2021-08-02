import { Request, Response, NextFunction } from "express"
import { SecretCryptoKey } from "../../models/index"
import { decryption } from "../../utils/index"
export const validation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { form, userId } = req.body
  const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
  const dataDecrypt = await decryption(form, keyOnServer.privateKey)
  const { name, last_name, email, password, position } = dataDecrypt

  const pass: [] = password.split("")
  const url: string = req.url
  try {
    if (url === "/register") {
      if (!name) {
        res.status(300).json({ message: "Fill out the forms name" })
      } else if (!last_name) {
        res.status(300).json({ message: "Fill out the forms last_name" })
      } else if (!email) {
        res.status(300).json({ message: "Fill out the forms email" })
      } else if (pass.length < 6) {
        res
          .status(300)
          .json({ message: "Password must be more than 6 characters" })
      } else if (!position) {
        res.status(300).json({ message: "Fill out the forms position" })
      } else {
        next()
      }
    }
    if (url === "/login") {
      if (!email) {
        res.status(300).json({ message: "Fill out the forms email" })
      } else if (pass.length < 6) {
        res.status(300).json({ message: "Fill out the forms password" })
      } else {
        next()
      }
    }
  } catch (e) {
    console.log(e)
  }
}
