import { User } from "../../models/index"
import { Request, Response } from "express"
import { token } from "../../utils/token"
import { hash, compare } from "bcryptjs"
import { SecretCryptoKey } from "../../models/index"
import { decryption, encryption } from "../../utils/index"
import {
  IAnswerServer,
  IUser,
  IUbdateUserBlockWorker,
} from "../../interface/auth"

export const register = async (req: Request, res: Response) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { name, last_name, email, password, position } = dataDecrypt
    const candidate: IUser = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: "This user already exists" })
    }
    const hashedPassword: string = await hash(password, 12)

    const user: IUser = new User({
      name,
      last_name,
      email,
      password: hashedPassword,
      position,
      permissions: position === "chief" ? "true" : "false",
    })
    await user.save()

    const jwtToken: string = token(user._id)
    const data: IAnswerServer = {
      date: `${user.date}`,
      email: user.email,
      last_name: user.last_name,
      name: user.name,
      permissions: user.permissions,
      position: user.position,
      token: `Bearer ${jwtToken}`,
      userId: `${user._id}`,
    }
    const dataEncrypt = await encryption({ data }, keyOnServer.publicKey)
    res.status(201).json({ data: dataEncrypt, message: "User created" })
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { email, password } = dataDecrypt

    const user: IUser = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "You don not have registration" })
    }

    const isMatch: boolean = await compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again" })
    }

    const jwtToken: string = token(user._id)

    const data: IAnswerServer = {
      date: user.date,
      email: user.email,
      last_name: user.last_name,
      name: user.name,
      permissions: user.permissions,
      position: user.position,
      token: `Bearer ${jwtToken}`,
      userId: user._id,
    }
    const dataEncrypt = await encryption(data, keyOnServer.publicKey)
    res.status(200).json(dataEncrypt)
  } catch (e) {
    console.log(e)
  }
}

export const usersWorking = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const user: [IUser] = await User.find()
    const dataEncrypt = await encryption(user, keyOnServer.publicKey)
    res.status(200).json(dataEncrypt)
  } catch (e) {
    console.log(e)
  }
}

export const userBlockWorker = async (req: Request, res: Response) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { _id, permissions } = dataDecrypt
    const ubdate: IUbdateUserBlockWorker = {
      permissions: JSON.stringify(permissions),
    }
    if (_id === userId) {
      res.status(400).json({ message: "You con not block yourself !" })
    } else {
      await User.findByIdAndUpdate({ _id }, { $set: ubdate }, { new: true })
      res.status(200).json({ message: "Block worker are unlocked !" })
    }
  } catch (e) {
    console.log(e)
  }
}

export const userdeleteWorker = async (req: Request, res: Response) => {
  try {
    const { form, userId } = req.body
    const keyOnServer: any = await SecretCryptoKey.findOne({ userId })
    const dataDecrypt = await decryption(form, keyOnServer.privateKey)
    const { _id } = dataDecrypt
    if (_id === userId) {
      res.status(400).json({ message: "You con not delete yourself !" })
    } else {
      await User.deleteOne({ _id })
      res.status(204).json({ message: "Delete worker" })
    }
  } catch (e) {
    console.log(e)
  }
}
