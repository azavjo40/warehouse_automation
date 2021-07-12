import { Request, Response, NextFunction } from "express"
import User from "../../models/auth"
export const chefsCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { position } = req.body
    const user = await User.find({ position })
    const chief = await user.filter((item: any) => item.position === "chief")
    if (chief.length === 3) {
      res.status(400).json({ message: "Chief connot more than 3 )))" })
    } else {
      next()
    }
  } catch (e) {
    console.log(e)
  }
}
