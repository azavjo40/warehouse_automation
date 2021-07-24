import { Request, Response, NextFunction } from "express"
import User from "../../models/auth"
import { IUser } from "../../interface/auth"
export const permissionsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, userId } = req.body
  try {
    const user: IUser = await User.findOne({ _id: userId })
    const candidate: IUser = await User.findOne({ _id })
    if (user.position === "chief") next()
    else if (
      user.position === "maneger" &&
      candidate.position === "storekeeper"
    ) {
      next()
    } else res.status(300).json({ message: "You don not have permission !" })
  } catch (e) {
    console.log(e)
  }
}
