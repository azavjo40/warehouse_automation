import { Request, Response } from "express"
import { SecretCryptoKey } from "../../models/index"
import NodeRSA from "node-rsa"

export const autoCreateCryptoKey = async (req: Request, res: Response) => {
  try {
    const { userId, clientKey } = req.body

    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })

    if (clientKey && keyOnServer) {
      const serverDecryptKey = new NodeRSA(keyOnServer.privateKey)

      const keyDecrypt: any = JSON.parse(
        serverDecryptKey.decrypt(clientKey, "utf8")
      )

      const keyOnServerSendClient: string = JSON.stringify(keyOnServer)

      const keySendEecrypt = new NodeRSA(keyDecrypt)

      const ecryptKeySendClient = keySendEecrypt.encrypt(
        keyOnServerSendClient,
        "base64"
      )
      res.status(200).json(ecryptKeySendClient)
    } else if (keyOnServer) {
      res.status(200).json({ publicKey: keyOnServer.publicKey })
    } else {
      const newKey = new NodeRSA({ b: 1024 })

      const publicKey = newKey.exportKey("public")

      const privateKey = newKey.exportKey("private")

      await new SecretCryptoKey({
        privateKey,
        publicKey,
        userId,
      }).save()

      res.status(201).json({ publicKey })
    }
  } catch (e) {
    console.log(e)
  }
}
