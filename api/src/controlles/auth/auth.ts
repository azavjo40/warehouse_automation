import User from "../../models/auth"
import { Request, Response } from "express"
import { token } from "../../utils/token"
import { hash, compare } from "bcryptjs"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, last_name, email, password, position } = req.body
    const candidate: any = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: "This user already exists" })
    }
    const hashedPassword: string = await hash(password, 12)

    const user: any = new User({
      name,
      last_name,
      email,
      password: hashedPassword,
      position,
      permissions: position === "storekeeper" ? "false" : "true",
    })

    await user.save()

    const jwtToken: string = token(user._id)

    res.status(201).json({
      user,
      token: `Bearer ${jwtToken}`,
      userId: user._id,
      message: "User created",
    })
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user: any = await User.findOne({ email })

    const isMatch: boolean = await compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again" })
    }

    const jwtToken: string = token(user._id)
    res
      .status(200)
      .json({ user, token: `Bearer ${jwtToken}`, userId: user._id })
  } catch (e) {
    console.log(e)
  }
}

export const usersWorking = async (req: Request, res: Response) => {
  try {
    const user: any = await User.find()
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
  }
}
