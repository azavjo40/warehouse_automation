import { Request, Response, NextFunction } from "express"
import { User } from "../../models/index"
import { SecretCryptoKey } from "../../models/index"
import { decryption, encryption } from "../../utils/index"
export const chefsCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { position } = dataDecrypt
    const user = await User.find({ position })
    const chief = await user.filter((item: any) => item.position === "chief")
    if (chief.length === 3) {
      res.status(400).json({ message: "Chief connot more than 3 )))" })
    } else {
      next()
    }
  } catch (e) {
    console.log(e)
  }
}
