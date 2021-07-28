import { Request, Response } from "express"
import { SecretKey } from "../../models/index"
import NodeRSA from "node-rsa"

export const autoCreateKey = async (req: Request, res: Response) => {
  try {
    const { userId, clientKey } = req.body
    const keyOnServer: any = await SecretKey.findOne({ userId })
    if (clientKey && keyOnServer) {
      const serverDecryptKey = new NodeRSA(keyOnServer.privateKey)
      const keyDecrypt: any = JSON.parse(
        serverDecryptKey.decrypt(clientKey, "utf8")
      )
      const ubdate: any = {
        privateKey: keyDecrypt.privateKey,
        publicKey: keyDecrypt.publicKey,
        userId,
      }
      await SecretKey.findByIdAndUpdate(
        { _id: keyOnServer._id },
        { $set: ubdate },
        { new: true }
      )

      res.status(200)
    } else if (keyOnServer) {
      res.status(200).json({ publicKey: keyOnServer.publicKey })
    } else {
      const newKey = new NodeRSA({ b: 1024 })
      const publicKey = newKey.exportKey("public")
      const privateKey = newKey.exportKey("private")
      await new SecretKey({
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
