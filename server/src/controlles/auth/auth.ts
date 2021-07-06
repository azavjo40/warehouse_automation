import User from "../../models/auth"
import { Request, Response } from "express"
import { token } from "../../midllware/token"
export const register = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}
