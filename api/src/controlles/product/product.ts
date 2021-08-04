import { Request, Response } from "express"
import {
  Receipt,
  Dispatch,
  CommonProducts,
  SecretCryptoKey,
} from "../../models/index"
import { decryption } from "../../utils/index"

export const dispatch = async (req: Request, res: Response) => {
  try {
    const { userId, dataEcrypt } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(dataEcrypt, keyOnServer.privateKey)
    console.log(dataDecrypt)
    // await new Dispatch(dataDecrypt).save()
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

    const findCommonProducts = await CommonProducts.findOne({
      product_name: dataDecrypt.product_name,
      type_commodity: dataDecrypt.type_commodity,
    })
    console.log(dataDecrypt)
    if (findCommonProducts) {
      console.log(findCommonProducts)
      res.status(204).json({ message: "Products change received!" })
    } else {
      console.log("hello")
      const commonProducts = await new CommonProducts({
        product_name: dataDecrypt.product_name,
        type_commodity: dataDecrypt.type_commodity,
        quantity: dataDecrypt.quantity,
      }).save()
      console.log(dataDecrypt)
      await new Receipt(dataDecrypt).save()
      res.status(201).json({ message: "Products received!" })
    }
  } catch (e) {
    console.log(e)
  }
}
