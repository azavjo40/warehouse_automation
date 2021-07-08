import User from "../../models/auth"
import { Request, Response } from "express"
import { token } from "../../utils/token"
export const register = async (req: Request, res: Response) => {
  try {
    // const { name, last_name, email, password, position } = req.body
    res.status(201).json({ message: "User create" })
  } catch (e) {
    console.log(e)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    console.log(e)
  }
}
