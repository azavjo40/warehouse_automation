import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import NodeRSA from "node-rsa"

export const autoCreateCryptoKey = async (req: Request, res: Response) => {
  try {
    const { userId, clientKey, timeId } = req.body
    console.log(userId, clientKey, timeId)
    const keyOnServer: any = await SecretCryptoKey.findOne({
      userId: userId ? userId : timeId,
    })
    console.log(keyOnServer)
    if (keyOnServer) {
      const encrypt = new NodeRSA(clientKey)
      const keyOnServerToString: string = JSON.stringify(keyOnServer)
      const dataEncrypt: any = encrypt.encrypt(keyOnServerToString, "base64")
      res.status(200).json(dataEncrypt)
    } else {
      const newKey = new NodeRSA({ b: 1024 })
      const publicKey = newKey.exportKey("public")
      const privateKey = newKey.exportKey("private")

      const secretCryptoKey = await new SecretCryptoKey({
        privateKey,
        publicKey,
        userId: userId ? userId : timeId,
      }).save()

      const encrypt = new NodeRSA(clientKey)
      const keyOnServerToString: string = JSON.stringify(secretCryptoKey)
      const dataEncrypt: any = encrypt.encrypt(keyOnServerToString, "base64")
      if (!userId) {
        setTimeout(() => SecretCryptoKey.deleteOne({ userId: timeId }), 9000)
      }

      res.status(201).json(dataEncrypt)
    }
  } catch (e) {
    console.log(e)
  }
}
