import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import { Receipt, Dispatch } from "../../models/index"
import NodeRSA from "node-rsa"
export const dispatch = async (req: Request, res: Response) => {
  try {
    const { userId, formEcrypte } = req.body

    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })

    const serverDecryptKey = new NodeRSA(keyOnServer.privateKey)

    const form: any = JSON.parse(serverDecryptKey.decrypt(formEcrypte, "utf8"))

    const dispatch: any = await new Dispatch(form).save()
    res.status(201).json({ message: "Products send!" })
  } catch (e) {
    console.log(e)
  }
}

export const receipt = async (req: Request, res: Response) => {
  try {
    const { userId, formEcrypte } = req.body

    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })

    const serverDecryptKey = new NodeRSA(keyOnServer.privateKey)

    const form: any = JSON.parse(serverDecryptKey.decrypt(formEcrypte, "utf8"))

    const receipt: any = await new Receipt(form).save()

    res.status(201).json({ message: "Products received!" })
  } catch (e) {
    console.log(e)
  }
}
