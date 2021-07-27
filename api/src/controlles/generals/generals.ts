import { Request, Response } from "express"
import { SecretKey, TimeKey } from "../../models/index"
import NodeRSA from "node-rsa"

export const autoCreateKey = async (req: Request, res: Response) => {
  try {
    const { userId, secretKey } = req.body
    if (secretKey && userId) {
      const timekey: any = await TimeKey.findOne({ userId })
      const secret = await timekey.privateK.decrypt(secretKey, "utf8")
      await new SecretKey({
        privateK: secret.privateK,
        publicK: secret.publicK,
        userId,
      }).save()
      await TimeKey.deleteOne({ userId })
      res.status(201)
    } else if (userId) {
      const key = new NodeRSA({ b: 1024 })
      const public_key = key.exportKey("public")
      const private_key = key.exportKey("private")
      const publicK = new NodeRSA(public_key)
      const privateK = new NodeRSA(private_key)
      await new TimeKey({ privateK, publicK, userId }).save()
      res.status(201).json({ publicK })
    }
  } catch (e) {
    console.log(e)
  }
}
