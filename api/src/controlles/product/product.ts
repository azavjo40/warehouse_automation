import { Request, Response } from "express"
import {
  Receipt,
  Dispatch,
  CommonProducts,
  SecretCryptoKey,
  User,
} from "../../models/index"
import { encryption } from "../../utils/index"
import { decryption } from "../../utils/index"

export const dispatch = async (req: Request, res: Response) => {
  try {
    const { userId, FormData } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(FormData, keyOnServer.privateKey)
    const findCommonProducts = await CommonProducts.findOne({
      product_name: dataDecrypt.product_name,
      type_commodity: dataDecrypt.type_commodity,
    })
    if (findCommonProducts) {
      if (dataDecrypt.quantity > findCommonProducts.quantity) {
        if (findCommonProducts.quantity === "0") {
          await CommonProducts.deleteOne({ _id: findCommonProducts._id })
          res.status(200).json({ message: "We don not have that Products!" })
        } else {
          res
            .status(200)
            .json({ message: "We don not have that much Products!" })
        }
      } else {
        const ubdate = {
          quantity: JSON.stringify(
            parseInt(findCommonProducts.quantity) -
              parseInt(dataDecrypt.quantity)
          ),
        }
        await CommonProducts.findByIdAndUpdate(
          { _id: findCommonProducts._id },
          { $set: ubdate },
          { new: true }
        )
        await new Dispatch(dataDecrypt).save()
        res.status(200).json({ good: true, message: "Products send!" })
      }
    } else {
      res.status(200).json({ message: "No Products !" })
    }
  } catch (e) {
    console.log(e)
  }
}

export const receipt = async (req: Request, res: Response) => {
  try {
    const { userId, FormData } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(FormData, keyOnServer.privateKey)
    const findCommonProducts = await CommonProducts.findOne({
      product_name: dataDecrypt.product_name,
      type_commodity: dataDecrypt.type_commodity,
    })

    if (findCommonProducts) {
      const ubdate = {
        quantity: JSON.stringify(
          parseInt(findCommonProducts.quantity) + parseInt(dataDecrypt.quantity)
        ),
      }
      await CommonProducts.findByIdAndUpdate(
        { _id: findCommonProducts._id },
        { $set: ubdate },
        { new: true }
      )
      await new Receipt(dataDecrypt).save()
      res.status(200).json({ good: true, message: "Products change received!" })
    } else {
      await new CommonProducts({
        product_name: dataDecrypt.product_name,
        type_commodity: dataDecrypt.type_commodity,
        quantity: dataDecrypt.quantity,
      }).save()
      await new Receipt(dataDecrypt).save()
      res.status(201).json({ good: true, message: "Products received!" })
    }
  } catch (e) {
    console.log(e)
  }
}

export const histryProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const user = await User.findOne({ _id: userId })
    if (!user.permissions) {
      res.status(200).json({ message: "You don not permissions!" })
    }
    if (user.position === "chief" || "maneger") {
      const receipt = await Receipt.find()
      const sendProduct = await Dispatch.find()
      const dataEncrit = encryption(
        { receipt, sendProduct },
        keyOnServer.publicKey
      )
      res.status(200).json(dataEncrit)
    } else {
      const receipt = await Receipt.find({ _id: userId })
      const sendProduct = await Dispatch.find({ _id: userId })
      const dataEncrit = encryption(
        { receipt, sendProduct },
        keyOnServer.publicKey
      )
      res.status(200).json(dataEncrit)
    }
  } catch (e) {
    console.log(e)
  }
}

export const deleteHistryProducts = async (req: Request, res: Response) => {
  try {
    const { userId, FormData } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(FormData, keyOnServer.privateKey)
    const { post, get } = dataDecrypt
    if (post) {
      await Dispatch.deleteOne({ _id: post })
      res.status(200).json({ message: "You delete history" })
    } else if (get) {
      await Receipt.deleteOne({ _id: get })
      res.status(200).json({ message: "You delete history" })
    }
  } catch (e) {
    console.log(e)
  }
}
