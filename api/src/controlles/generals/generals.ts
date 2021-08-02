import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import { encryption } from "../../utils/index"
import NodeRSA from "node-rsa"

export const autoCreateCryptoKey = async (req: Request, res: Response) => {
  try {
    const { userId, clientKey, timeId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({
      userId: userId ? userId : timeId,
    })
    if (keyOnServer) {
      const dstaEncrypt = await encryption(keyOnServer, clientKey)
      res.status(200).json(dstaEncrypt)
    } else {
      const newKey = new NodeRSA({ b: 1024 })
      const publicKey = newKey.exportKey("public")
      const privateKey = newKey.exportKey("private")

      const secretCryptoKey = await new SecretCryptoKey({
        privateKey,
        publicKey,
        userId: userId ? userId : timeId,
      }).save()
      const dataEncrypt = await encryption(secretCryptoKey, clientKey)
      if (!userId) {
        setTimeout(() => SecretCryptoKey.deleteOne({ userId: timeId }), 9000)
      }
      res.status(201).json(dataEncrypt)
    }
  } catch (e) {
    console.log(e)
  }
}
