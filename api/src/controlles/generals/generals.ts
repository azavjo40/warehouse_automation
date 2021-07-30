import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import NodeRSA from "node-rsa"

export const autoCreateCryptoKey = async (req: Request, res: Response) => {
  try {
    const { userId, clientKey, timeId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({
      userId: userId ? userId : timeId,
    })

    if (clientKey && keyOnServer) {
      const serverDecryptKey = new NodeRSA(keyOnServer.privateKey)

      const keyDecryptClient: any = JSON.parse(
        serverDecryptKey.decrypt(clientKey, "utf8")
      )

      const keyOnServerTOString: string = JSON.stringify(keyOnServer)

      const encrypt = new NodeRSA(keyDecryptClient)

      const encryptData = encrypt.encrypt(keyOnServerTOString, "base64")

      res.status(200).json(encryptData)
    } else if (keyOnServer) {
      res.status(200).json({ publicKey: keyOnServer.publicKey })
    } else {
      const newKey = new NodeRSA({ b: 1024 })

      const publicKey = newKey.exportKey("public")

      const privateKey = newKey.exportKey("private")

      await new SecretCryptoKey({
        privateKey,
        publicKey,
        userId: userId ? userId : timeId,
      }).save()

      if (!userId) {
        setTimeout(() => SecretCryptoKey.deleteOne({ userId: timeId }), 9000)
      }

      res.status(201).json({ publicKey })
    }
  } catch (e) {
    console.log(e)
  }
}
