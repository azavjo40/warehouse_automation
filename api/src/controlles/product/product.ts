import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import { Receipt, Dispatch } from "../../models/index"
import { decryption } from "../../utils/index"
export const dispatch = async (req: Request, res: Response) => {
  try {
    const { userId, dataEcrypt } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(dataEcrypt, keyOnServer.privateKey)
    await new Dispatch(dataDecrypt).save()
    res.status(201).json({ message: "Products send!" })
  } catch (e) {
    console.log(e)
  }
}

export const receipt = async (req: Request, res: Response) => {
  try {
    const { userId, dataEcrypt } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(dataEcrypt, keyOnServer.privateKey)
    await new Receipt(dataDecrypt).save()
    res.status(201).json({ message: "Products received!" })
  } catch (e) {
    console.log(e)
  }
}
