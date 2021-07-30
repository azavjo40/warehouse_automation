import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import { Receipt, Dispatch } from "../../models/index"
import NodeRSA from "node-rsa"
export const dispatch = async (req: Request, res: Response) => {
  try {
    const { userId, dataEcrypte } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const decrypte = new NodeRSA(keyOnServer.privateKey)
    const decryptData = decrypte.decrypt(dataEcrypte, "utf8")
    const decryptDataToSting: string = JSON.parse(decryptData)
    await new Dispatch(decryptDataToSting).save()
    res.status(201).json({ message: "Products send!" })
  } catch (e) {
    console.log(e)
  }
}

export const receipt = async (req: Request, res: Response) => {
  try {
    const { userId, dataEcrypte } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const decrypte = new NodeRSA(keyOnServer.privateKey)
    const decryptData = decrypte.decrypt(dataEcrypte, "utf8")
    const decryptDataToSting: string = JSON.parse(decryptData)
    await new Receipt(decryptDataToSting).save()
    res.status(201).json({ message: "Products received!" })
  } catch (e) {
    console.log(e)
  }
}
