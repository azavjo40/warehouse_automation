import { Request, Response, NextFunction } from "express"
import { User } from "../../models/index"
import { IUser } from "../../interface/auth"
import { SecretCryptoKey } from "../../models/index"
import { decryption } from "../../utils/index"
export const permissionsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { _id } = dataDecrypt
    const user: IUser = await User.findOne({ _id: userId })
    const candidate: IUser = await User.findOne({ _id })
    if (user.position === "chief") next()
    else if (
      user.position === "maneger" &&
      candidate.position === "storekeeper"
    ) {
      next()
    } else res.status(300).json({ message: "You don not have permission !" })
  } catch (e) {
    console.log(e)
  }
}
