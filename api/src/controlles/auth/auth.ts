import { User } from "../../models/index"
import { Request, Response } from "express"
import { token } from "../../utils/token"
import { hash, compare } from "bcryptjs"
import {
  IAnswerServer,
  IUser,
  IUbdateUserBlockWorker,
} from "../../interface/auth"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, last_name, email, password, position } = req.body
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
      permissions: position === "storekeeper" ? "false" : "true",
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
    res.status(201).json({
      data,
      message: "User created",
    })
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

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

    res.status(200).json({ data })
  } catch (e) {
    console.log(e)
  }
}

export const usersWorking = async (req: Request, res: Response) => {
  try {
    const user: [IUser] = await User.find()
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
  }
}

export const userBlockWorker = async (req: Request, res: Response) => {
  try {
    const { _id, permissions, userId } = req.body
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
    const { _id, userId } = req.body
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
